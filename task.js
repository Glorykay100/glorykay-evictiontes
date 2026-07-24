(function(){
  const API = "https://dummyjson.com/posts";
  const PAGE_SIZE = 12;
  const TAG_COLORS = ['#c9973f', '#5c8a82', '#9a7aa8', '#b5704a'];

  const homePage = document.getElementById('page-home');
  const blogPage = document.getElementById('page-blog');
  const navLinks = document.querySelectorAll('nav.links a[data-route]');
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinksEl = document.getElementById('navLinks');

  let blogState = { skip:0, total:0, all:[], query:'', tag:'' };

  function setActiveNav(route){
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.dataset.route === route);
    });
  }

  function route(){
    const hash = window.location.hash || '#/';
    const path = hash.replace('#','').split('?')[0] || '/';
    if(path.startsWith('/blog')){
      homePage.classList.remove('active');
      blogPage.classList.add('active');
      setActiveNav('/blog');
      if(blogState.all.length === 0){ loadBlogPage(true); }
    } else {
      blogPage.classList.remove('active');
      homePage.classList.add('active');
      setActiveNav('/');
    }
    navLinksEl.classList.remove('open');
  }
  window.addEventListener('hashchange', route);
  burgerBtn.addEventListener('click', ()=> navLinksEl.classList.toggle('open'));

  function tagColor(tag){
    let h = 0;
    for(let i=0;i<tag.length;i++) h = tag.charCodeAt(i) + ((h<<5)-h);
    return TAG_COLORS[Math.abs(h) % TAG_COLORS.length];
  }

  function excerpt(text, len){
    return text.length > len ? text.slice(0,len).trim() + '…' : text;
  }

  function postCardHTML(post){
    const tags = (post.tags||[]).map(t=>`<span class="pill" style="border-color:${tagColor(t)}55; color:${tagColor(t)}">${t}</span>`).join('');
    return `
      <article class="post-card">
        <span class="post-id mono">#${String(post.id).padStart(3,'0')}</span>
        <h3 class="post-title">${escapeHTML(post.title)}</h3>
        <p class="post-body">${escapeHTML(post.body)}</p>
        <div class="tag-row">${tags}</div>
        <div class="stat-row">
          <span>♥ ${post.reactions ? post.reactions.likes : 0}</span>
          <span>✕ ${post.reactions ? post.reactions.dislikes : 0}</span>
          <span>◎ ${post.views || 0}</span>
        </div>
      </article>`;
  }

  function escapeHTML(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // -------- Home page: "From the Shelf" live preview --------
  async function loadShelfPreview(){
    const grid = document.getElementById('shelfGrid');
    try{
      const res = await fetch(`${API}?limit=3&skip=7`);
      if(!res.ok) throw new Error('bad response');
      const data = await res.json();
      grid.innerHTML = data.posts.map(p=>`
        <article class="post-card">
          <span class="post-id mono">#${String(p.id).padStart(3,'0')}</span>
          <h3 class="post-title">${escapeHTML(p.title)}</h3>
          <p class="post-body">${escapeHTML(excerpt(p.body, 160))}</p>
          <div class="tag-row">${(p.tags||[]).slice(0,3).map(t=>`<span class="pill" style="border-color:${tagColor(t)}55; color:${tagColor(t)}">${t}</span>`).join('')}</div>
        </article>`).join('');
    }catch(err){
      grid.innerHTML = `<div class="state-msg" style="grid-column:1/-1;"><div class="display">The shelf didn't load.</div>Check your connection and refresh the page.</div>`;
    }
  }

  // -------- Blog page --------
  async function loadBlogPage(reset){
    const grid = document.getElementById('blogGrid');
    const loadMoreWrap = document.getElementById('loadMoreWrap');
    const resultCount = document.getElementById('resultCount');

    if(reset){
      blogState = { skip:0, total:0, all:[], query:'', tag:'' };
      grid.innerHTML = `
        <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>
        <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>`;
      loadMoreWrap.style.display = 'none';
    }

    try{
      const res = await fetch(`${API}?limit=${PAGE_SIZE}&skip=${blogState.skip}`);
      if(!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      blogState.total = data.total;
      blogState.all = blogState.all.concat(data.posts);
      blogState.skip += data.posts.length;

      populateTagFilter(blogState.all);
      renderBlogGrid();

      loadMoreWrap.style.display = blogState.skip < blogState.total ? 'flex' : 'none';
    }catch(err){
      grid.innerHTML = `<div class="state-msg" style="grid-column:1/-1;">
        <div class="display">The archive didn't open.</div>
        The API request failed — check your connection, then try again.
      </div>`;
      loadMoreWrap.style.display = 'none';
    }
  }

  function populateTagFilter(posts){
    const select = document.getElementById('tagFilter');
    const existing = new Set(Array.from(select.options).map(o=>o.value));
    const tags = new Set();
    posts.forEach(p => (p.tags||[]).forEach(t => tags.add(t)));
    Array.from(tags).sort().forEach(t=>{
      if(!existing.has(t)){
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        select.appendChild(opt);
      }
    });
  }

  function renderBlogGrid(){
    const grid = document.getElementById('blogGrid');
    const resultCount = document.getElementById('resultCount');
    const q = blogState.query.trim().toLowerCase();
    const tagSel = blogState.tag;

    const filtered = blogState.all.filter(p=>{
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q);
      const matchesTag = !tagSel || (p.tags||[]).includes(tagSel);
      return matchesQuery && matchesTag;
    });

    resultCount.textContent = `${filtered.length} of ${blogState.total} stories loaded`;

    if(filtered.length === 0){
      grid.innerHTML = `<div class="state-msg" style="grid-column:1/-1;">
        <div class="display">No stories match.</div>
        Try a different word, or clear the genre filter.
      </div>`;
      return;
    }
    grid.innerHTML = filtered.map(postCardHTML).join('');
  }

  document.getElementById('searchInput').addEventListener('input', (e)=>{
    blogState.query = e.target.value;
    renderBlogGrid();
  });
  document.getElementById('tagFilter').addEventListener('change', (e)=>{
    blogState.tag = e.target.value;
    renderBlogGrid();
  });
  document.getElementById('loadMoreBtn').addEventListener('click', ()=> loadBlogPage(false));

  // init
  loadShelfPreview();
  route();
})();