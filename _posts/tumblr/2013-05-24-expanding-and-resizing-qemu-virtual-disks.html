---
layout: post
title: Expanding (and resizing) QEMU Virtual Disks
date: '2013-05-24T16:52:00+01:00'
tags:
- kvm
- qemu
- virtualization
- image resizing
- qcow2
tumblr_url: http://blog.pebblecode.com/post/51229954039/expanding-and-resizing-qemu-virtual-disks
author: Vince Martínez
---
<p>Resizing a VM partition can be tricky, so if you&rsquo;ve ever created a disk image and realised that you needed more space, this post explains how you can resize a QEMU virtual disk, and expand its partitions if you need.</p>
<p>I don&rsquo;t recommend trying to resize the partition in place with truncate, so in this example we will create a new disk image and copy over the contents from our existing VM&rsquo;s disk image, resizing the partitions in the process. Our VM domain name is <em>herman</em>, and it&rsquo;s a QEMU disk image - qcow2. </p>
<p>First, create a temp directory where you will be working in:</p>
<pre><code>TMPDIR=`mktemp -d`
cd $TMPDIR
</code></pre>
<p>Then create your new disk here with <a href="http://linux.die.net/man/1/qemu-img">qemu-img</a>, with the desired size. In my case, I&rsquo;ve chosen 32GB:</p>
<pre><code>$ qemu-img create -f qcow2 -o preallocation=metadata $TMPDIR/herman_vm.qcow2 32GB<br/><br/></code></pre>
<blockquote>
<p><em>Formatting &rsquo;/tmp/tmp.NKT2q5rDVz/herman_vm.qcow2&rsquo;, fmt=qcow2 size=34359738368 encryption=off cluster_size=65536 preallocation=&lsquo;metadata&rsquo;</em></p>
</blockquote>
<p>Allegedly <span>preallocation=metadata</span><span> improves I/O performance, and for a little more performance <a href="http://kashyapc.wordpress.com/2011/12/02/little-more-disk-io-perf-improvement-with-fallocateing-a-qcow2-disk/" title="Little more disk I/O perf. improvement with ‘fallocate’ing a qcow2 disk">you can try fallocate</a>. </span><span>Take the size in bytes from the feedback in the previous command </span><span>use </span><code>fallocate</code><span> if you want to preallocate the disk space:</span></p>
<pre><code>$ fallocate -l 34359738368 $TMPDIR/herman_vm.qcow2</code></pre>
<h4>Clone your existing disk into the new one</h4>
<p><span>Now you have your new disk ready, it&rsquo;s time to copy over your existing disk&rsquo;s data.</span></p>
<p><span>To find out where your existing disk image is, use virsh dumpxml and query the xml path.</span></p>
<pre><code>$ sudo virsh dumpxml herman | xpath -e /domain/devices/disk/source
&gt; Found 1 nodes in stdin:
&gt; -- NODE --
&gt; &lt;source file="/vms/herman/tmpkdYhWL.qcow2" /&gt;
$ OLD_DISK=/vms/herman/tmpkdYhWL.qcow2    
</code></pre>
<p>It is usefull to know how your existing partitions are layed out. You can find that out with <code>virt-filesystems</code>:</p>
<pre><code>$ sudo virt-filesystems --long --parts --blkdevs -h -a $OLD_DISK
</code></pre>
<p>Note down the partitions you want to <em>expand</em>, or <em>resize</em>: <code>expand</code> means take up the remaining free space (only one partition can be expanded), while <code>resize</code> means resize to a specific size. If you resize all your partitions, the remaining free space will be unallocated.</p>
<p>In our case, I&rsquo;ve chosen to resize the swap /dev/sda2 partition to 2GB and expand the / partition (which will be aproximately 30GB).</p>
<pre><code>$ sudo virt-resize --resize /dev/sda2=+1G --expand /dev/sda1 $OLD_DISK $TMPDIR/herman_vd.qcow2
</code></pre>
<p>After a long output copying over the data in your existing virtual disk, the partition will be resize. Move the file to the vm&rsquo;s folder, and remember to <strong>update permissions </strong><span>(yours may differ from mine)</span><span>:</span></p>
<pre><code>$ sudo mv $TMPDIR/herman_vd.qcow2 /vms/herman/
$ sudo chown libvirt-qemu.kvm /vms/herman/herman_vd.qcow2
</code></pre>
<p><span>You&rsquo;re almost done now. You need to update the xml config for your VM:</span></p>
<pre><code>$ sudo virsh edit herman</code></pre>
<p>and change <code>&lt;source file="/vms/herman/tmpkdYhWL.qcow2" /&gt;</code> under devices/disk to <code>&lt;source file="/vms/herman/herman_vd.qcow2" /&gt;</code></p>
<h4>Restart the VM</h4>
<p>After you&rsquo;re done, you can delete the <code>TMPDIR</code> and restart the VM and test if it&rsquo;s working</p>
<pre><code>$ rmdir $TMPDIR
$ sudo virsh destroy herman
$ sudo virsh start herman
</code></pre>
<p>If all has gone well and the restart was successful, you can also safely delete the old disk image.</p>
