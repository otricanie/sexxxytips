/* =====================================================================
   SEXY TIPS — catalog data + rendering + quick-view modal
   products built from @katalogsexytips + @ssexytips drops
   ===================================================================== */
(() => {
  'use strict';
  const TG = 'https://t.me/velsenpai';
  const img = (n) => `assets/img/${n}.jpg`;

  const TEE = '100% ХЛОПОК';
  const tee = (tkan, range, print) =>
    [['ТКАНЬ', tkan], ['КРОЙ', 'ОВЕРСАЙЗ'], ['РАЗМЕРЫ', range], ['ПЕЧАТЬ', print || 'ПРИНТ HD']];

  /* ----- product catalogue ----- */
  const PRODUCTS = [
    {
      id: 'banger-black', name: 'БЭНГЕР', sub: 'ЧЁРНЫЙ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [{ c: 'new', t: 'NEW' }], colors: ['black', 'pink'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['cat_black_a', 'cat_black_b'],
      desc: 'фирменный крест на груди, надпись на спине, бирка с «размером». дроп 01 — оверсайз премиум, партия ограничена.',
      spec: tee('ПРЕМИУМ ХЛОПОК', 'S–3XL', 'КРЕСТ / НАДПИСЬ'), note: 'тираж ограничен'
    },
    {
      id: 'banger-pink', name: 'БЭНГЕР', sub: 'РОЗОВЫЙ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [{ c: 'new', t: 'NEW' }], colors: ['pink', 'black'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['cat_pink_a', 'cat_pink_b'],
      desc: 'розовая версия бэнгера. крест на спине крупнее, на груди — вышивка «sexy tips». оверсайз премиум.',
      spec: tee('ПРЕМИУМ ХЛОПОК', 'S–3XL', 'КРЕСТ / ВЫШИВКА'), note: 'тираж ограничен'
    },
    {
      id: 'cards', name: 'КАРТЫ', sub: 'ВАРЁНКА',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [{ c: 'limited', t: 'ХИТ' }], colors: ['black'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_cards_a', 'k_cards_b'],
      desc: 'варёнка с принтом ретро-карт. оверсайз крой, премиум хлопок, печать HD.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'хит сезона'
    },
    {
      id: 'blondinka', name: 'БЛОНДИНКА', sub: 'ЧЁРНАЯ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_blondinka_a', 'k_blondinka_b'],
      desc: 'чёрная футболка с винтажным принтом. оверсайз, печать HD, премиум хлопок.',
      spec: tee(TEE, 'XS–3XL'), note: 'оверсайз'
    },
    {
      id: 'zazhigalka-yellow', name: 'ЗАЖИГАЛКА', sub: 'ЖЁЛТАЯ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['black'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_zazhigalka-yellow_a', 'k_zazhigalka-yellow_b'],
      desc: 'варёнка чёрная с принтом «зажигалка». оверсайз крой, печать HD.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'варёнка'
    },
    {
      id: 'zazhigalka-violet', name: 'ЗАЖИГАЛКА', sub: 'ФИОЛЕТОВАЯ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['lightpink'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_zazhigalka-violet_a', 'k_zazhigalka-violet_b', 'model_zazhigalka_1', 'model_zazhigalka_2'],
      desc: 'та же зажигалка, варёнка светло-розовая. оверсайз, премиум хлопок.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'варёнка'
    },
    {
      id: 'stars', name: 'ЗВЁЗДЫ', sub: 'ПРИНТ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['black'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_stars_a', 'k_stars_b'],
      desc: 'варёнка чёрная, графика с звёздами. оверсайз, печать HD.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'оверсайз'
    },
    {
      id: 'yellow-panties', name: 'ЖЁЛТЫЕ', sub: 'ПРИНТ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['lightpink'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_yellow-panties_a', 'k_yellow-panties_b'],
      desc: 'варёнка светло-розовая, графический принт. оверсайз крой.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'варёнка'
    },
    {
      id: 'mnogabab-vert', name: 'МНОГАБАБ', sub: 'ВЕРТИКАЛЬ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['blue'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_mnogabab-vert_a', 'k_mnogabab-vert_b'],
      desc: 'варёнка синяя, вертикальный принт. оверсайз, премиум хлопок.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'варёнка'
    },
    {
      id: 'mnogabab', name: 'МНОГАБАБ', sub: 'ФИОЛЕТОВАЯ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [{ c: 'limited', t: 'XL–3XL' }], colors: ['violet'],
      sizes: ['XL', '2XL', '3XL'], imgs: ['k_mnogabab_a', 'k_mnogabab_b'],
      desc: 'фиолетовая, только крупные размеры (xl–3xl). оверсайз, премиум хлопок.',
      spec: tee(TEE, 'XL–3XL'), note: 'только крупные размеры'
    },
    {
      id: 'red-baba', name: 'КРАСНАЯ', sub: 'ГРАФИКА',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['grey'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_red-baba_a', 'k_red-baba_b'],
      desc: 'варёнка серая с красным принтом. оверсайз, премиум хлопок.',
      spec: tee('ВАРЁНКА / ХЛОПОК', 'S–3XL'), note: 'варёнка'
    },
    {
      id: 'green-text', name: 'НАДПИСЬ', sub: 'ЗЕЛЁНАЯ',
      cat: 'futbolki', catLabel: 'ФУТБОЛКА', price: 2800,
      tags: [], colors: ['black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'], imgs: ['k_green-text_a', 'k_green-text_b'],
      desc: 'чёрная, зелёная надпись по центру. минимализм, оверсайз, печать HD.',
      spec: tee(TEE, 'XS–3XL', 'НАДПИСЬ'), note: 'минимализм'
    },
    {
      id: 'cross-hoodie', name: 'ХУДИ', sub: '',
      cat: 'hudi', catLabel: 'ХУДИ', price: 4500,
      tags: [{ c: 'limited', t: 'LIMITED' }], colors: ['black'],
      sizes: ['S', 'M', 'L', 'XL', '2XL'], imgs: ['hudi_a', 'hudi_b', 'model_hoodie_luda', 'model_hoodie_luda2'],
      desc: 'тяжёлое худи с принтом sexy tips на спине и фирменной подписью на груди. двухслойный капюшон, металл-фурнитура.',
      spec: [['ПРИНТ', 'SEXY TIPS / СПИНА'], ['КРОЙ', 'ОВЕРСАЙЗ'], ['КАПЮШОН', 'ДВУХСЛОЙНЫЙ'], ['РАЗМЕРЫ', 'S–2XL'], ['ФУРНИТУРА', 'МЕТАЛЛ']],
      note: 'дроп ограничен'
    },
    {
      id: 'cap-embroidery', name: 'КЕПКА', sub: 'ВЫШИВКА',
      cat: 'aksy', catLabel: 'АКСЕССУАР', price: 1800,
      tags: [{ c: 'new', t: 'NEW' }], colors: ['chrome'],
      sizes: ['ONE SIZE'], imgs: ['cat_cap_a', 'cat_cap_b'],
      desc: 'серая кепка с вышивкой «sexy tips». регулируемая застёжка, премиум коттон.',
      spec: [['ДЕКОР', 'ВЫШИВКА'], ['ЦВЕТ', 'СЕРЫЙ'], ['ЗАСТЁЖКА', 'РЕГУЛИРУЕМАЯ'], ['РАЗМЕР', 'UNI'], ['МАТЕРИАЛ', 'КОТТОН']],
      note: 'к любому луку'
    },
    {
      id: 'secret-drop', name: '???', sub: '',
      cat: 'secret', catLabel: 'СЕКРЕТ', price: null, secret: true,
      tags: [{ c: 'limited', t: 'СЕКРЕТ' }], colors: [],
      sizes: ['??'], imgs: ['secret_drop', 'secret_drop'],
      desc: 'эксклюзив. только для своих. напиши — узнаешь.',
      spec: [['СТАТУС', 'СЕКРЕТ'], ['ДОСТУП', 'ПО ЗАПРОСУ'], ['ТИРАЖ', '??']],
      note: 'только для своих'
    }
  ];

  const FILTERS = [
    { id: 'all', label: 'ВСЁ' },
    { id: 'futbolki', label: 'ФУТБОЛКИ' },
    { id: 'hudi', label: 'ХУДИ' },
    { id: 'aksy', label: 'АКСЕССУАРЫ' }
  ];

  const fmt = (n) => n == null ? '???' : n.toLocaleString('ru-RU') + '₽';
  const grid = document.getElementById('grid');
  const filterBar = document.getElementById('filters');
  if (!grid) return;

  /* ----- card markup ----- */
  const BANGER_BY_COLOR = { black: 'banger-black', pink: 'banger-pink' };
  const isBanger = (p) => p.id === 'banger-black' || p.id === 'banger-pink';

  function cardHTML(p) {
    const a = p.imgs[0], b = p.imgs[1] || p.imgs[0];
    const tags = p.tags.map(t => `<span class="tag tag--${t.c}">${t.t}</span>`).join('');
    const swColors = isBanger(p) ? [] : p.colors;
    const sw = swColors.map(c => `<span class="swatch" data-c="${c}"></span>`).join('');
    const sold = p.status === 'sold';
    const secret = p.secret === true;
    return `
      <article class="card${sold ? ' is-sold' : ''}${secret ? ' is-secret' : ''}" data-cat="${p.cat}" data-id="${p.id}">
        <div class="card__media">
          <img class="a" src="${img(a)}" alt="${p.name} ${p.sub}" loading="lazy">
          <img class="b" src="${img(b)}" alt="" loading="lazy">
          <div class="card__tags">${tags}</div>
          <div class="swatches">${sw}</div>
          ${sold ? '<div class="soldban"><span>SOLD</span></div>' : ''}
          <button class="card__quick" data-cursor="смотреть" aria-label="Быстрый просмотр">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
        </div>
        <div class="card__body">
          <div class="card__row">
            <h3 class="card__name">${p.name}${p.sub ? ` <span class="hot">·</span> ${p.sub}` : ''}</h3>
            <span class="card__price${sold ? ' sold' : ''}">${fmt(p.price)}</span>
          </div>
          <div class="card__meta">${p.catLabel} // ${p.sizes.length > 1 ? p.sizes[0] + '–' + p.sizes[p.sizes.length - 1] : p.sizes[0]}</div>
        </div>
      </article>`;
  }

  /* ----- filter bar ----- */
  function renderFilters() {
    filterBar.innerHTML = `<span class="lbl">ФИЛЬТР</span>` +
      FILTERS.map(f => {
        const n = f.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === f.id).length;
        return `<button class="chip${f.id === 'all' ? ' active' : ''}" data-f="${f.id}">${f.label}<span class="n">${n}</span></button>`;
      }).join('') +
      `<span class="count" id="count"></span>`;
  }

  let active = 'all';
  function apply() {
    const list = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);
    grid.innerHTML = list.map(cardHTML).join('');
    const c = document.getElementById('count');
    if (c) c.textContent = String(list.length).padStart(2, '0') + ' ПОЗИЦИЙ';
    // re-trigger reveal for new cards
    requestAnimationFrame(() => grid.querySelectorAll('.card').forEach((el, i) => {
      el.style.opacity = 0; el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .6s var(--ease),transform .6s var(--ease)';
      setTimeout(() => { el.style.opacity = 1; el.style.transform = 'none'; }, 40 + i * 50);
    }));
  }

  renderFilters();
  apply();

  filterBar.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    active = chip.dataset.f;
    filterBar.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === chip));
    apply();
  });

  /* ================= MODAL ================= */
  const modal = document.getElementById('modal');
  const byId = id => PRODUCTS.find(p => p.id === id);
  let selSize = null;

  function openModal(p) {
    selSize = null;
    const sold = p.status === 'sold';
    const secret = p.secret === true;
    const imgs = p.imgs;
    const thumbs = !secret && imgs.length > 1
      ? `<div class="modal__thumbs">${imgs.map((n, i) => `<button class="${i === 0 ? 'active' : ''}" data-i="${i}"><img src="${img(n)}" alt=""></button>`).join('')}</div>`
      : '';
    const sizes = p.sizes.map(s => `<button data-size="${s}">${s}</button>`).join('');
    const spec = p.spec.map(r => `<div class="row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
    const ownColor = isBanger(p) ? (p.id === 'banger-black' ? 'black' : 'pink') : p.colors[0];
    const sw = p.colors.map(c => `<span class="swatch${c === ownColor ? ' is-on' : ''}" data-c="${c}" title="${c}"></span>`).join('');
    const tags = p.tags.map(t => `<span class="tag tag--${t.c}">${t.t}</span>`).join('');

    modal.querySelector('.modal__card').className = 'modal__card' + (secret ? ' is-secret' : '');
    modal.querySelector('.modal__card').innerHTML = `
      <div class="modal__media">
        ${imgs.map((n, i) => `<img class="m-fill${i === 0 ? ' show' : ''}" data-i="${i}" src="${img(n)}" alt="" aria-hidden="true"><img class="${i === 0 ? 'show' : ''}" data-i="${i}" src="${img(n)}" alt="${p.name}">`).join('')}
        ${thumbs}
      </div>
      <div class="modal__info">
        <div class="top">
          <div>
            <div class="card__tags" style="position:static;flex-direction:row;margin-bottom:12px">${tags}</div>
            <h3>${p.name}${p.sub ? ` <span class="hot">·</span> ${p.sub}` : ''}</h3>
            <div class="card__meta" style="margin-top:8px">${p.catLabel} // АРТ. ${p.id.toUpperCase()}</div>
          </div>
          <button class="modal__close" data-cursor="закрыть" aria-label="Закрыть">
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>
          </button>
        </div>
        <p class="modal__desc">${p.desc}</p>
        ${secret ? '' : `<div>
          <div class="tiny" style="margin-bottom:10px">ЦВЕТ</div>
          <div class="swatches" style="display:flex;gap:10px">${sw}</div>
        </div>
        <div>
          <div class="tiny" style="margin-bottom:10px">РАЗМЕР</div>
          <div class="modal__sizes">${sizes}</div>
        </div>`}
        <div class="modal__spec">${spec}</div>
        <div class="modal__buy">
          <div class="modal__price${sold ? ' sold' : ''}" style="${sold ? 'text-decoration:line-through;color:var(--mut)' : ''}">${fmt(p.price)}</div>
          ${sold
            ? `<button class="btn" disabled style="opacity:.5;pointer-events:none"><span>ПРОДАНО</span></button>`
            : secret
              ? `<a class="btn btn--hot" href="${TG}" target="_blank" rel="noopener" data-cursor="узнать"><span>УЗНАТЬ <span class="arr">→</span></span></a>`
              : `<button class="btn btn--hot add-cart" data-cursor="в корзину"><span>В КОРЗИНУ <span class="arr">→</span></span></button>`}
        </div>
        ${sold || secret ? '' : '<div class="ord-err" hidden></div>'}
        <div class="tiny" style="color:var(--mut2)">${secret ? 'ТОЛЬКО ПО ЗАПРОСУ · НАПИШИ @VELSENPAI' : 'ДОСТАВКА: СДЭК · ЯНДЕКС · ОЗОН · ЛИЧНАЯ ВСТРЕЧА МОСКВА'}</div>
      </div>`;

    // wire interactions inside modal
    const mc = modal.querySelector('.modal__card');
    const showImg = i => {
      mc.querySelectorAll('.modal__media img').forEach(im => im.classList.toggle('show', +im.dataset.i === i));
      mc.querySelectorAll('.modal__thumbs button').forEach(b => b.classList.toggle('active', +b.dataset.i === i));
      fitMedia();
    };
    mc.querySelectorAll('.modal__thumbs button').forEach(b => b.addEventListener('click', () => showImg(+b.dataset.i)));
    mc.querySelectorAll('.swatches .swatch').forEach(s => s.addEventListener('click', () => {
      const c = s.dataset.c;
      if (isBanger(p) && BANGER_BY_COLOR[c] && BANGER_BY_COLOR[c] !== p.id) {
        openModal(byId(BANGER_BY_COLOR[c]));
      }
    }));
    mc.querySelectorAll('.modal__sizes button').forEach(b => b.addEventListener('click', () => {
      mc.querySelectorAll('.modal__sizes button').forEach(x => x.classList.remove('sel'));
      b.classList.add('sel'); selSize = b.dataset.size;
    }));
    mc.querySelector('.modal__close').addEventListener('click', closeModal);

    /* ----- add to cart ----- */
    const addBtn = mc.querySelector('.add-cart');
    if (addBtn) {
      const err = mc.querySelector('.ord-err');
      addBtn.addEventListener('click', () => {
        if (p.sizes.length > 1 && !selSize) {
          err.textContent = 'СНАЧАЛА ВЫБЕРИ РАЗМЕР';
          err.hidden = false;
          mc.querySelector('.modal__sizes').scrollIntoView({ block: 'center', behavior: 'smooth' });
          return;
        }
        err.hidden = true;
        addToCart(p, selSize || p.sizes[0]);
        closeModal();
        openCart();
      });
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fitMedia();
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* =====================================================================
     CART — add items, drawer UI, checkout, order goes to orders.json
     ===================================================================== */
  const cartEl = document.getElementById('cart');
  const cartPanel = cartEl ? cartEl.querySelector('.cart__panel') : null;
  const CART_KEY = 'st_cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) { cart = []; }
  let cartMode = 'items'; // items | checkout | done
  let lastOrder = null;
  const checkoutDraft = { name: '', surname: '', phone: '', telegram: '', delivery: '', address: '' };

  function persistCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* private mode */ }
    updateCartBadge();
  }
  function updateCartBadge() {
    const b = document.getElementById('cartn');
    if (!b) return;
    const n = cart.reduce((s, i) => s + i.qty, 0);
    b.textContent = n;
    b.style.display = n ? '' : 'none';
  }
  function addToCart(p, size) {
    const ex = cart.find(i => i.id === p.id && i.size === size);
    if (ex) ex.qty += 1;
    else cart.push({ id: p.id, size, qty: 1 });
    persistCart();
  }
  function cartTotal() {
    return cart.reduce((s, i) => {
      const p = byId(i.id);
      return s + (p && p.price ? p.price * i.qty : 0);
    }, 0);
  }

  function openCart() { cartMode = cart.length ? cartMode : 'items'; renderCart(); cartEl.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() {
    cartEl.classList.remove('open');
    if (!modal.classList.contains('open')) document.body.style.overflow = '';
    if (cartMode === 'done') { cartMode = 'items'; }
  }

  function renderCart() {
    if (!cartPanel) return;
    const head = `<div class="cart__head"><h4>${cartMode === 'checkout' ? 'ОФОРМЛЕНИЕ' : 'КОРЗИНА'}</h4>
      <button class="modal__close cart-x" data-cursor="закрыть" aria-label="Закрыть">
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>
      </button></div>`;

    if (cartMode === 'done' && lastOrder) {
      cartPanel.innerHTML = head + `
        <div class="cart__done">
          <div class="done-num">ЗАКАЗ № ${lastOrder.num}</div>
          <p>ЗАКАЗ ПРИНЯТ. МЫ ПОЛУЧИЛИ ТВОИ КОНТАКТЫ И САМИ НАПИШЕМ${lastOrder.customer.telegram ? ' В TELEGRAM' : ' ИЛИ ПОЗВОНИМ'} ДЛЯ ПОДТВЕРЖДЕНИЯ.</p>
          <button class="btn btn--hot cart-x"><span>ПОНЯТНО <span class="arr">→</span></span></button>
        </div>`;
    } else if (cartMode === 'checkout') {
      cartPanel.innerHTML = head + `
        <button class="cart__back">← НАЗАД В КОРЗИНУ</button>
        <div class="cart__form">
          <label class="ord-label"><span>ИМЯ <span class="hot">*</span></span><input data-f="name" type="text" value="${checkoutDraft.name}" autocomplete="given-name"></label>
          <label class="ord-label"><span>ФАМИЛИЯ <span class="hot">*</span></span><input data-f="surname" type="text" value="${checkoutDraft.surname}" autocomplete="family-name"></label>
          <label class="ord-label"><span>ТЕЛЕФОН <span class="hot">*</span></span><input data-f="phone" type="tel" placeholder="+7 999 000-00-00" value="${checkoutDraft.phone}" autocomplete="tel"></label>
          <label class="ord-label"><span>НИК В TELEGRAM <small style="color:var(--mut)">(если хочешь, чтобы написали туда)</small></span><input data-f="telegram" type="text" placeholder="@ник" value="${checkoutDraft.telegram}" autocomplete="off"></label>
          <div class="ord-label"><span>СПОСОБ ПОЛУЧЕНИЯ <span class="hot">*</span></span>
            <div class="dlv">
              <button class="dlv-btn${checkoutDraft.delivery === 'meet' ? ' sel' : ''}" data-d="meet">ЛИЧНАЯ ВСТРЕЧА · МОСКВА</button>
              <button class="dlv-btn${checkoutDraft.delivery === 'ship' ? ' sel' : ''}" data-d="ship">ДОСТАВКА</button>
            </div>
          </div>
          <label class="ord-label dlv-addr" ${checkoutDraft.delivery === 'ship' ? '' : 'hidden'}><span>АДРЕС ДОСТАВКИ <span class="hot">*</span></span><input data-f="address" type="text" placeholder="город, улица, дом, квартира / ПВЗ" value="${checkoutDraft.address}" autocomplete="street-address"></label>
          <div class="ord-err" hidden></div>
          <div class="cart__total"><span>ИТОГО</span><b>${fmt(cartTotal())}</b></div>
          <button class="btn btn--hot btn--block cart-submit"><span>ОФОРМИТЬ <span class="arr">→</span></span></button>
        </div>`;
    } else {
      const rows = cart.map((i, idx) => {
        const p = byId(i.id);
        if (!p) return '';
        return `<div class="cart__row" data-i="${idx}">
          <img src="${img(p.imgs[0])}" alt="">
          <div class="inf">
            <span class="nm">${p.name}${p.sub ? ' · ' + p.sub : ''}</span>
            <span class="mt">РАЗМЕР ${i.size}</span>
            <span class="pr">${fmt(p.price)}</span>
          </div>
          <div class="cart__qty">
            <button class="q-minus" aria-label="Меньше">−</button><span>${i.qty}</span><button class="q-plus" aria-label="Больше">+</button>
          </div>
          <button class="cart__rm" aria-label="Убрать">✕</button>
        </div>`;
      }).join('');
      cartPanel.innerHTML = head + (cart.length
        ? `<div class="cart__items">${rows}</div>
           <div class="cart__total"><span>ИТОГО</span><b>${fmt(cartTotal())}</b></div>
           <button class="btn btn--hot btn--block cart-go"><span>ПЕРЕЙТИ К ОФОРМЛЕНИЮ <span class="arr">→</span></span></button>`
        : `<div class="cart__empty">КОРЗИНА ПУСТА.<br>ДОБАВЬ ЧТО-НИБУДЬ ИЗ КАТАЛОГА.</div>`);
    }
    wireCart();
  }

  function wireCart() {
    cartPanel.querySelectorAll('.cart-x').forEach(b => b.addEventListener('click', closeCart));
    cartPanel.querySelectorAll('.cart__row').forEach(row => {
      const idx = +row.dataset.i;
      row.querySelector('.q-plus').addEventListener('click', () => { cart[idx].qty += 1; persistCart(); renderCart(); });
      row.querySelector('.q-minus').addEventListener('click', () => {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        persistCart(); renderCart();
      });
      row.querySelector('.cart__rm').addEventListener('click', () => { cart.splice(idx, 1); persistCart(); renderCart(); });
    });
    const go = cartPanel.querySelector('.cart-go');
    if (go) go.addEventListener('click', () => { cartMode = 'checkout'; renderCart(); });
    const back = cartPanel.querySelector('.cart__back');
    if (back) back.addEventListener('click', () => { saveDraft(); cartMode = 'items'; renderCart(); });
    const submit = cartPanel.querySelector('.cart-submit');
    if (submit) submit.addEventListener('click', submitOrder);
    cartPanel.querySelectorAll('.dlv-btn').forEach(b => b.addEventListener('click', () => {
      checkoutDraft.delivery = b.dataset.d;
      cartPanel.querySelectorAll('.dlv-btn').forEach(x => x.classList.toggle('sel', x === b));
      const addr = cartPanel.querySelector('.dlv-addr');
      if (addr) addr.hidden = checkoutDraft.delivery !== 'ship';
    }));
  }

  function saveDraft() {
    cartPanel.querySelectorAll('[data-f]').forEach(inp => { checkoutDraft[inp.dataset.f] = inp.value.trim(); });
  }

  function submitOrder() {
    saveDraft();
    const err = cartPanel.querySelector('.ord-err');
    const d = checkoutDraft;
    const problems = [];
    if (!d.name) problems.push('ИМЯ');
    if (!d.surname) problems.push('ФАМИЛИЯ');
    if (!/^\+?[0-9][0-9\s\-()]{8,}$/.test(d.phone)) problems.push('ТЕЛЕФОН');
    if (!d.delivery) problems.push('СПОСОБ ПОЛУЧЕНИЯ');
    if (d.delivery === 'ship' && !d.address) problems.push('АДРЕС');
    if (d.telegram && !/^@?[a-zA-Z0-9_]{4,}$/.test(d.telegram)) problems.push('TELEGRAM-НИК');
    if (problems.length) {
      err.textContent = 'ПРОВЕРЬ ПОЛЯ: ' + problems.join(', ');
      err.hidden = false;
      return;
    }
    if (!cart.length) { err.textContent = 'КОРЗИНА ПУСТА'; err.hidden = false; return; }
    const order = {
      num: 'ST-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      customer: {
        name: d.name,
        surname: d.surname,
        phone: d.phone,
        telegram: d.telegram ? (d.telegram.startsWith('@') ? d.telegram : '@' + d.telegram) : null,
        delivery: d.delivery === 'ship' ? 'доставка' : 'личная встреча',
        address: d.delivery === 'ship' ? d.address : null
      },
      items: cart.map(i => {
        const p = byId(i.id);
        return { id: i.id, name: p.name + (p.sub ? ' ' + p.sub : ''), size: i.size, qty: i.qty, price: p.price };
      }),
      total: cartTotal(),
      source: 'site'
    };
    // заказ — в orders.json на сервере; localStorage — запасная копия
    fetch('api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    }).catch(() => {});
    try {
      const all = JSON.parse(localStorage.getItem('st_orders') || '[]');
      all.push(order);
      localStorage.setItem('st_orders', JSON.stringify(all));
    } catch (e) { /* private mode */ }
    lastOrder = order;
    cart = [];
    persistCart();
    Object.keys(checkoutDraft).forEach(k => { checkoutDraft[k] = ''; });
    cartMode = 'done';
    renderCart();
  }

  const cartBtn = document.getElementById('cartbtn');
  if (cartBtn) cartBtn.addEventListener('click', () => { cartMode = 'items'; openCart(); });
  if (cartEl) cartEl.querySelector('.cart__bg').addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && cartEl.classList.contains('open')) closeCart(); });
  updateCartBadge();

  /* photo column width follows the image's own aspect ratio (pure CSS does the rest) */
  function fitMedia() {
    const media = modal.querySelector('.modal__media');
    if (!media) return;
    const im = media.querySelector('img.show:not(.m-fill)') || media.querySelector('img:not(.m-fill)');
    if (!im) return;
    const go = () => {
      if (im.naturalWidth) media.style.setProperty('--mr', im.naturalWidth / im.naturalHeight);
    };
    if (im.complete && im.naturalWidth) go();
    else im.addEventListener('load', go, { once: true });
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    openModal(byId(card.dataset.id));
  });
  modal?.querySelector('.modal__bg')?.addEventListener('click', closeModal);
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  window.SEXYTIPS = { PRODUCTS };
})();
