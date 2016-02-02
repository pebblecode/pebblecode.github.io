---
layout: post
title:  Unit Testing React Components and Redux Containers
author: Mike James
categories: react
---
In this post I'll go through how to get enzyme setup to test your presentational components.
---
# Unit testing React Components and Redux reducers
NB: this post assumes knowledge of react, redux and webpack.

I recently started working on a new project, the task; to build your standard single page app with a rich user experience. We decided to go for React and Redux as we're also using it on a few other client and internal projects, plus its my goto tool for client side development. However I was interested in this move to more functional languages for clientside development such as [Elm](http://elm-lang.org) but not quite ready to use it in anger yet; stay tuned for for another blogpost ;).

Whilst in the initial setup phase of the project I decided to include [Enzyme](https://github.com/airbnb/enzyme) a powerful testing utility from the guys at Airbnb, it allows you to render, query, simulate interactions and assert output and no opinion on testing framework. I first discovered this library at the very popular [London React Meetup (good luck if you get tickets!)](http://www.meetup.com/London-React-User-Group).

In this post we'll go through the setup of a React, Redux Webpack application with a focus on getting your reducers tested via mocha and your react components being tested in PhantomJS by using karma. With a focus on being able to keep development fast, structure clean and easy to navigate. Whilst embracing the redux way in structuring your application.

## Folder Structure of our application.
.
├── dist
├── README.md
├── karma.config.js
├── package.json
├── server.dev.js
├── server.js
├── server.prod.js
├── src
│   ├── actions
│   ├── colors.js
│   ├── components
│   ├── containers
│   ├── index.html
│   ├── index.js
│   ├── reducers
│   ├── store
│   └── utils
├── tests.webpack.js
└── webpack.config.js

karma.config we'll need to load up our components and containers into a browser for testing as we're using postcss and other loaders that don't work natively in node.js. So to get our tests to run in browser we will also include a copy of our webpack config to get karma to load it up. If you load up your tests which rely on webpack loaders down the line you'll get Unexpected token errors.

server.js selects an appropriate .dev.js, .prod.js file on startup. server.dev.js uses webpack dev server. prod.js uses just express to host the static output in the dist folder.

src is where our application code lives. Components contain our presentational components such as TexBox, Button(s), ListItem etc. All components are decoupled from redux. With styles being loaded in ```import styles from './styles.css'``` by using [Css Modules](https://github.com/css-modules/css-modules). Everything a component behaves on is passed down into its props.

containers, react components that have very little if any styling. With the glue to pass down state to its child components. In here we're also making use of redux-forms higher order component to give us validation and state management as forms generally behave is the same way. This library has dramatically helped reduce boilerplate.

actions contains our functions that are triggered by user actions or workers in our application. 

##Testing our reducers
This is trivial, redux has no coupling to the browser here, so we can test our application like a state machine. 

Example Test:

```
import {expect} from 'chai';
import reducer from '../counter';

describe('Counter Reducer', () => {
  it('Should handle INCREMENT', () => {
    const initialState = {count: 0};

    const newState = reducer(initialState, {type: 'INCREMENT'});

    expect(newState).to.eql({
      count: 1
    });
  });

  it('Should handle DECREMENT', () => {
    const initialState = {count: 1};

    const newState = reducer(initialState, {type: 'DECREMENT'});

    expect(newState).to.eql({
      count: 0
    });
  });
});

```

Reducer:
```
import {createReducer} from '../utils';

const initialState = {count: 0};

export default createReducer(initialState, {
  ['INCREMENT']: (state) => ({
    count: state.count + 1
  }),
  ['DECREMENT']: (state) => ({
    count: state.count - 1
  })
});
```
If you're interested in what createReducer does [see](https://github.com/joshgeller/react-redux-jwt-auth-example/blob/master/src/utils/index.js#L12) it gives a nicer switch structure.

## Testing react components with enzyme
Enzyme gives us a simple jQuery like selector interface which is really powerful for asserting whats been rendered.

Example Test:

```
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import NotificationTab from '../';
describe('Notification Tab', () => {
  it('Should render one notification', () => {
    const wrapper = shallow(<NotificationTab count={2}/>);
    expect(wrapper.text()).to.contain('2');
  });

  it('Should handle onClick', () => {

    const handleButtonClick = sinon.spy();
    const wrapper = shallow(
      <NotificationTab count={3} onClick={handleButtonClick} />
    );
    wrapper.find('div').simulate('click', {preventDefault: () => {}});
    expect(handleButtonClick.calledOnce).to.equal(true);
  });

});
```

See more info on [Enzymes API](http://airbnb.io/enzyme/docs/api/index.html)

Our Component:
![http://i.imgur.com/eMwEWVG.png](http://i.imgur.com/eMwEWVG.png)

```
import React, {Component, PropTypes} from 'react';
import Icon from '../Icon';

import styles from './styles.css';
class NotificationTab extends Component {
  render() {
    const {count} = this.props;

    return (
      <div className={styles.notification} {...this.props} onClick={(e) => {e.preventDefault(); this.props.onClick();}}>
        {count > 0 ? <span className={styles.count}>{count}</span> : null}
        <Icon name={'notification'} width={25} height={30}/>
      </div>);
  }
}

NotificationTab.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

NotificationTab.defaultProps = {
  onClick: () => {}
};

export default NotificationTab;
```

## Karma Setup
This bit was rather fiddly as sinon the mocking library was breaking karma Issue 47 on (github)[https://github.com/airbnb/enzyme/issues/47] helped with this.

karma.config.js
```
const webpack = require('webpack');
// See issues for details on parts of this config.
// https://github.com/airbnb/enzyme/issues/47
// had issues loading sinon as its a dep of enzyme
var argv = require('minimist')(process.argv.slice(2));


module.exports = (config) => {
  config.set({
    browsers: [ 'PhantomJS' ], // run in Chrome
    singleRun: argv.watch ? false : true, // just run once by default
    frameworks: [ 'mocha' ], // use the mocha test framework
    files: [
      'tests.webpack.js' // just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], // report results in this format
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      module: {
        preLoaders: [{
          test: /\.(js|jsx)$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'isparta'
        }],
        loaders: [{
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loaders: ['babel']
        }, {
          test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
          loader: 'url-loader?name=[path][name].[ext]&context=./src'
        }, {
          test: /\.html/,
          loader: 'file?name=[name].[ext]'
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
        }, {
          test: /\.json$/,
          loader: 'json'
        },
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?mimetype=application/vnd.ms-fontobject'},
        {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
        {test: /.svg(\?v=\d+\.\d+\.\d+)?$|.svg$/, loader: 'url?name=[path][name].[ext]&context=./src&mimetype=image/svg+xml'},
        {
          test: /sinon\.js$/,
          loader: 'imports?define=>false,require=>false'
        }
        ]
      },
      postcss: () => {
        return [
          require('precss'),
          require('postcss-simple-vars')({
            variables: () => {
              return require('./src/colors');
            }
          }),
          require('autoprefixer')({ browsers: ['last 2 versions'] })
        ];
      },
      isparta: {
        embedSource: true,
        noAutoWrap: true
        // these babel options will be passed only to isparta and not to babel-loader
      },
      externals: {
        jsdom: 'window',
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window'
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      }
    },

    webpackServer: {
      noInfo: false // please don't spam the console when running in karma!
    }
  });
};
```

you'll notice we're doing some funky stuff with sinon to stop it breaking require. 

We can now test our react components in silo and with the power of PhantomJS, we're able to test our components extremly fast. Setup a ```npm run karma:watch``` task to run in the background whilst developing. Here we're currently testing a dumb presentational component, but next we can go ahead and test our redux containers for more functional testing.

And thats it! in the coming week I'll release a bare bones boilerplate project, complete with postcss, hot module replacement with the testing config shown here.

voice you're opinion at me [@export_mike](https://twitter.com/@export_mike) on twitter or [@pebblecode](https://twitter.com/@pebblecode). Thanks for reading, oh! I almost forgot we're [hiring](http://pebblecode.com/careers/#job-1220)!




