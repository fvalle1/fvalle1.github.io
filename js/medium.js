// Load the latest Medium posts (the feed has no CORS headers, so go through rss2json)
fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://medium.com/feed/@filippovalle'))
    .then(r => r.json())
    .then(data => {
        if (data.status !== 'ok' || !data.items.length) return;
        const list = document.getElementById('medium-posts');
        const template = list.firstElementChild;
        const posts = data.items.slice(0, 4).map(post => {
            const li = template.cloneNode(true);
            const a = li.querySelector('a');
            a.href = post.link.split('?')[0];
            a.textContent = post.title;
            li.querySelector('small').textContent = new Date(post.pubDate.replace(' ', 'T') + 'Z')
                .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return li;
        });
        list.replaceChildren(...posts);
    })
    .catch(() => { }); // keep the static list
