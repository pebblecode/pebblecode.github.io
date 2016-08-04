---
layout: post
title: Unit Testing Redux Container Components
author: Jonathan King
categories: [redux, react, development, testing]
thumbnail: /img/blog/redux-container-testing/containers.jpg
---

### Unit Testing A Dynamic Breadcrumb Container Component with Redux and Enzyme

## Overview

Redux is fantastic for managing and reasoning with complex UI state. However, when writing a large React application using Redux, [there are varying opinions on how to write tests for your container components](https://twitter.com/dan_abramov/status/704268606742388736).

*NB.* If you're new to unit testing with redux, you might want to start with [this blogpost](/blog/react-redux-unit-testing/), which gives a good overview to getting started.

This blogpost gives what we feel is a fairly clean approach that doesn't involve exporting an unwrapped version of your component. It builds upon the approach given in [this recent blogpost by Shane Brunson](http://www.wsbrunson.com/react/redux/test/2016/05/08/testing-redux-containers.html).

Container components are React components that take advantage of Redux's `connect` method, and consequently are wired up with access to state and/or actions. We keep our containers in a separate folder from our other components. We also use `css-modules` to keep the styles co-located with our components, it therefore makes sense to keep the unit tests co-located, too. The structure of our app might look something like this:

![app layout](/img/blog/redux-container-testing/layout1.png)

## The component

We're using karma as our test-runner. For more info about our karma setup, see [the previous blogpost by my colleague Mike James](/blog/react-redux-unit-testing/).

For the purposes of this blogpost we'll be examining a Breadcrumbs component that we want to unit test. This is your typical website breadcrumb that sits at the top of every view, dutifully noting your navigation through `react-router`'s hierarchy, like this:

![app layout](/img/blog/redux-container-testing/breadcrumb1.png)

And here's the code (details may have been changed or omitted to protect the innocent):

    const Breadcrumb = props =>
      <div styleName={'breadcrumbs'}>
        {props.routes.map((r, i) =>
          <span key={i}>
            <Link to={r.path}>
              <FormattedMessage id={r.name} />
            </Link>
            { props.routeNum > 1 && i < props.routeNum - 1 && <span> > </span> }
          </span>
        )}
      </div>;

    export default compose(
      injectIntl,
      connect(mapStateToProps, mapDispatchToProps),
      CssModules(styles)
    )(Breadcrumb)

As you can see, it just maps links over the routes prop passed to it from `react-router`, passes their names to be formatted for internationalisation, and then has a bit of logic to decide whether to add a little `>` separator.

This is a very simple container component, passed into compose to wrap it with `connect`, `css-modules` and `react-intl`. Because of this, we need to be a bit clever with how we wrap it when mounting it for testing. Your mileage may vary, but the concepts here are fairly transferable no matter what decorators you're using.

## The test

In the `index-test.js` file for testing this container, we want to test two things:

 1. That the paths of the links in the breadcrumb are correct.
 2. That the rendering of the text is correct.

To do this, we need to set up the component in such a way that it is mounted with the specified props, the i18n formatting, and has access to a mocked store with some state for testing.

We'll use `enzyme` for mounting and `chai` for assertions. The other tools we'll need are built into the libraries we're using.

    import React from 'react';
    import { Provider } from 'react-redux';
    import { mount } from 'enzyme';
    import { expect } from 'chai';
    import { IntlProvider } from 'react-intl';
    import { Link } from 'react-router';
    import BreadcrumbNav from './index.js';
    import { getMessages } from '../../translations';

    const storeFake = (state) => ({
      default: () => {},
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({ ...state })
    });

    describe('<BreadcrumbNav />', () => {
      let paths;
      let fullText;

      beforeEach(() => {
        const store = storeFake({
          location: {
            name: 'Vauxhall'
          }
        });

        const props = {
          routes = [{
            path: '/',
            name: 'Home'
          }, {
            path: 'locations',
            name: 'Locations'
          }, {
            path: ':id',
            name: state => state.location.name
          }],
          params = {
            id: '7'
          }
        }

        const wrapper = mount(
          <IntlProvider locale={'en'} messages={getMessages('en')}>
              <Provider store={store}>
                <BreadcrumbNav ...props/>
              </Provider>
          </IntlProvider>
        );

        fullText = wrapper.find(BreadcrumbNav).text()
        paths = wrapper.find(Link).map(i => i.props().to);
      });

      it('should compute full paths correctly', () => {
        expect(paths).to.eql(['/', '/locations', '/locations/7']);
      });

      it('should render correctly', () => {
        expect(fullText).to.equal('Home > Locations > Vauxhall');
      });
    });

What we're doing here is using `enzyme` to mount the component, and passing in the two props we care about: params and routes.

Then we make sure that this component is wrapped in the Provider from `react-redux`, which gives us access to the fake store that we've mocked up. We usually create this store with a shared util, but I've included it here to show the bare bones of what's needed.

Lastly, in order for the internationalisation to work, we wrap the whole caboodle in IntlProvider, which needs to be passed your i18n files. `getMessages` is simply a helper function that returns these for a given locale.

Once that is set up, walking through the mounted components and pulling out the information is incredibly straightforward using `enzyme`. They have really good API docs regarding their selectors [here](http://airbnb.io/enzyme/docs/api/selector.html) but we found by far the nicest way to query components was simply to import them and pass them directly into the wrapper's `find` method.

## Conclusion

Co-locating your components, tests and css makes sense, makes it easy to reason with, and keeps those all-important concerns separated. Once you've got a good set-up to provide the state and various props needed by the component, testing Redux containers with `enzyme` is simple yet powerful.

## Addendum - Dynamic Breadcrumbs in React Router & Redux

If you're wondering how we dealt with having dynamic breadcrumbs in `react-router`, then I thought I'd add a little explanation of that, too.

In the Breadcrumb container component's connect decorator, the mapStateToProps function looks like this:

    const mapStateToProps = (state, ownProps) => ({
      routes: ownProps.routes.map(r => {
        if (typeof r.name === 'function') {
          return {...r, name: r.name(state)};
        }
        return {...r, name: ownProps.intl.formatMessage({id: `nav.${r.name.toLocaleLowerCase()}`})};
      }),
      routeNum: ownProps.routes.filter(r => r.path).length
    })

So we can include two types of `name` prop in our Route components in `routes.js`:

1. Functions, that pull it out of state.
2. Strings, that are directly formatted.

<pre class="language-jsx">
  <code class="language-jsx">
    <Route name={state => state.locations.name} path={'locations/:id'} component={Locations}/>
    <Route name={'locations'} path={'locations/:id'} component={Locations}/>
  </code>
</pre>

Then, finally, we can do a bit of further mapping and reducing in the Breadcrumb container component to concatenate the paths correctly and evaluate the params.

    // Evaluate and replace multiple params in path
    // eg. door/:id/foo/:doorId -> door/2/foo/5
    const replaceParams = params => route => {
      const matches = route.path.match(/:([^\/]+)/g) || [];
      matches.forEach(match => {
        const key = match.replace(':', '');
        const val = params[key];
        route.path = val;
      });
      return route;
    };

    const mapRoutes = (routes, params) => {
      if (!routes) return [];

      return routes.filter(route => route.path)
        .map((route, index) => ({
          ...route,
          fullPath: routes.slice(0, index + 1)
            .filter(i => i.path)
            .map(replaceParams(params))
            .map(i => i.path)
            .reduce((prev, curr, idx, arr) =>
              prev + (curr.charAt(curr.length - 1) !== '/' && idx < arr.length - 1 ? `${curr}/` : curr)
            )
        }));
    };

This ensures that what previously would have rendered as this:

![app layout](/img/blog/redux-container-testing/breadcrumb2.png)

Now renders as this:

![app layout](/img/blog/redux-container-testing/breadcrumb1.png)

But with the right path:

![app layout](/img/blog/redux-container-testing/breadcrumb3.png)

Simple!

### Thanks for reading!

Hate it? Love it? Feel cold and indifferent? Shout at me on twitter: [@JonKingUsername](https://twitter.com/@JonKingUsername), judge my code: [@JonathanUsername](https://github.com/JonathanUsername) or tell my boss: [@pebblecode](https://twitter.com/@pebblecode).
