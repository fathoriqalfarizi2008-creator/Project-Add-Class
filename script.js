"use strict";

    const socialLinks = [
        {
          name: "Instagram",
          url: "https://instagram.com/karyalokal.wadaslintang/",
          icon: "https://cdn.simpleicons.org/instagram/E4405F",
          label: "Buka Instagram Karya Lokal"
        },
        {
          name: "TikTok",
          url: "https://tiktok.com/@umkmwadaslintang/",
          icon: "https://cdn.simpleicons.org/tiktok/000000",
          label: "Buka TikTok Karya Lokal"

        },
        {
          name: "YouTube",
          url: "https://www.youtube.com/@UmkmWadaslintang",
          icon: "https://cdn.simpleicons.org/youtube/FF0000",
          label: "Buka YouTube Karya Lokal"
        }
    ];

    const initialLinks = [
      {
        title: "Instagram Karya Lokal",
        url: "https://instagram.com/karyalokal.wadaslintang",
        category: "sosmed",
        icon: "https://cdn.simpleicons.org/instagram/E4405F",
        featured: true,
        description: "Ikuti cerita dan karya terbaru kami."
      },
      {
        title: "Katalog Kerajinan Kayu",
        url: "https",
        category: "project",
        icon: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
        featured: true,
        description: "Jelajahi koleksi kerajinan kayu kami."
      },
      {
        title: "Produk Unggulan",
        url: "https",
        category: "project",
        icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
        featured: true,
        description: "Temukan produk pilihan Karya Lokal."
      },
      {
        title: "Panduan Perawatan Kayu",
        url: "https://example.com/perawatan",
        category: "project",
        icon: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
        featured: false,
        description: "Tips menjaga produk kayu agar awet."
      },
      {
        title: "Pesan melalui WhatsApp",
        url: "https://wa.me/6282313195866",
        category: "kontak",
        icon: "https://cdn.simpleicons.org/whatsapp/25D366",
        featured: true,
        description: "Hubungi kami untuk informasi pemesanan."
      },
      {
        title: "Lokasi Workshop",
        url: "https://maps.app.goo.gl/2dF6XV1sXy9hicbh7",
        category: "kontak",
        icon: "https://cdn.simpleicons.org/googlemaps/4285F4",
        featured: false,
        description: "Temukan lokasi workshop kami."
      }
    ];

    const products = [
      {
        name: "Rak Kayu Minimalis",
        price: 125000,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85",
        description: "Rak sederhana untuk mempercantik ruangan."
      },
      { name: "Meja Kayu Natural",
        price: 350000,
        image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85",
        description: "Meja bernuansa natural untuk ruang kerja."
      },
      { name: "Dekorasi Kayu",
        price: 85000,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
        description: "Sentuhan dekorasi hangat untuk rumah."
      }
    ];

    const businessContact = "6282313195866";
    const state = {
      links: initialLinks,
      activeCategory: "semua",
      searchQuery: "",
      theme: localStorage.getItem("karya-lokal-theme") || "light"
    };

    const categoryTabs = [
      { category: "semua", label: "Semua" },
      { category: "sosmed", label: "Media Sosial" },
      { category: "project", label: "Produk & Katalog" },
      { category: "kontak", label: "Kontak & Pemesanan" }
    ];

    const categoryLabels = {
      sosmed: "Media Sosial",
      project: "Produk & Katalog",
      kontak: "Kontak & Pemesanan"
    };

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
      })[character]);
    }

    function formatRupiah(amount) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", maximumFractionDigits: 0
      }).format(amount);
    }

    function getVisibleLinks() {
      const query = state.searchQuery.trim().toLowerCase();
      return state.links.filter(link => {
        const matchesCategory = state.activeCategory === "semua" || link.category === state.activeCategory;
        const searchable = `${link.title} ${link.description} ${categoryLabels[link.category] || ""}`.toLowerCase();
        return matchesCategory && searchable.includes(query);
      });
    }

    let messageTimer;
    function showMessage(message, isError = false) {
      const element = document.querySelector("#action-message");
      element.textContent = message;
      element.className = `min-h-4 text-center text-xs ${isError ? "text-red-600 dark:text-red-400" : "text-emerlad-700 dark:text-emerlad-400"}`;
      clearTimeout(messageTimer);
      messageTimer = setTimeout(() => {element.textContent = ""; }, 2800);
    }

    function iconTile(icon, compact = false) {
      return `
        <span
        aria-hidden="true"
        class="flex h-11 w-11 shrink-0 items-center justify-center
              rounded-[14px] bg-[#f5ead9]
              transition-colors dark:bg-[#3a2b20]
              ${compact ? "h-10 w-10 rounded-xl" : ""}"
      >
        <img
          src="${escapeHtml(icon)}"
          alt=""
          class="h-6 w-6 object-contain"
          loading="lazy"
        >
      </span>`;

    }

    function renderSocialLinks() {
      document.querySelector("#social-links").innerHTML = socialLinks.map(item => `
        <li>
          <a href="${escapeHtml(item.url)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${escapeHtml(item.label)}"
            class="flex h-11 w-11 items-center justify-center rounded-xl
                    border border-[#eadfd2] bg-white
                    transition duration-200
                    hover:-translate-y-1 hover:bg-[#f5ead9] hover:shadow-md
                    focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-amber-800
                    dark:border-[#514032] dark:bg-[#2a211a]">

            <img
              src="${escapeHtml(item.icon)}"
              alt="${escapeHtml(item.name)}"
              class="h-6 w-6 object-contain"
              loading="lazy"
            >

          </a>
        </li>
      `).join("");
    }

    function linkCard(link, compact = false) {
      const category = categoryLabels[link.category] || "Lainnya";

      if (compact) {
        return `
          <li>
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"
               class="group flex h-full items-start gap-3 rounded-2xl border border-[#ebe3d8] bg-white/90 p-3.5 shadow-[0_5px_20px_rgba(84,54,31,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d9c3a8] hover:shadow-[0_12px_28px_rgba(84,54,31,0.09)] dark:border-[#403329] dark:bg-[#211b16]">
              ${iconTile(link.icon)}
              <span class="min-w-0 flex-1">
                <span class="flex items-start justify-between gap-2">
                  <span class="text-sm font-bold leading-5 text-slate-800 dark:text-[#f4eee5]">${escapeHtml(link.title)}</span>
                  <span class="rounded-full bg-[#f8f1e8] px-2 py-1 text-xs text-[#7b3f20] transition group-hover:bg-[#ead8c3] dark:bg-[#3a2b20] dark:text-[#f5d8b6]" aria-hidden="true">↗</span>
                </span>
                <span class="mt-0.5 block text-xs text-slate-500 dark:text-[#c2b3a2]">${escapeHtml(category)}</span>
                <span class="mt-2 block text-xs leading-5 text-slate-500 dark:text-[#c2b3a2]">${escapeHtml(link.description)}</span>
              </span>
            </a>
          </li>`;
      }

      return `
         <li>
          <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"
             class="group flex items-center gap-3 rounded-xl px-2.5 py-3 transition duration-200 hover:bg-[#fcf8f2] dark:hover:bg-[#2a211a]">
            ${iconTile(link.icon, true)}
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-bold text-slate-800 dark:text-[#f4eee5]">${escapeHtml(link.title)}</span>
                <span class="rounded-full bg-[#f5ead9] px-2.5 py-1 text-[10px] font-medium text-[#805437] dark:bg-[#3a2b20] dark:text-[#f5d8b6]">${escapeHtml(category)}</span>
              </span>
              <span class="mt-1 block text-xs text-slate-500 dark:text-[#c2b3a2]">${escapeHtml(link.description)}</span>
            </span>
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f2e9] text-[#7b3f20] transition duration-200 group-hover:translate-x-1 dark:bg-[#3a2b20] dark:text-[#f5d8b6]" aria-hidden="true">→</span>
          </a>
        </li>`;
    }

    function renderFeaturedLinks() {
      const container = document.querySelector("#featured-list");
      const query = state.searchQuery.trim().toLowerCase();
      const featured = state.links.filter(link => {
        const searchable = `${link.title} ${link.description} ${categoryLabels[link.category] || ""}`.toLowerCase();
        return link.featured && searchable.includes(query);
      });

      container.innerHTML = featured.length
        ? featured.map(link => linkCard(link, true)).join("")
        : `<li class="col-span-full rounded-xl border border-dashed border-[#ddc9b2] p-6 text-center text-sm text-slate-500 dark:border-[#514032] dark:text-[#c2b3a2]">Tidak ada tautan unggulan yang cocok.</li>`;
    }

    function renderFilterTabs() {
      document.querySelector("#filter-tabs").innerHTML = categoryTabs.map(tab => `
        <button type="button"
          class="rounded-full border px-4 py-2 text-xs font-semibold transition duration-200 hover:border-[#c5a484] hover:bg-[#faf4ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 dark:hover:bg-[#33251c] ${state.activeCategory === tab.category ? "border-[#7b3f20] bg-[#7b3f20] text-white dark:border-[#a45d32] dark:bg-[#a45d32]" : "border-[#e8ded1] bg-white text-slate-600 dark:border-[#514032] dark:bg-[#211b16] dark:text-[#e8d9c8]"}"
          data-category="${tab.category}" aria-pressed="${state.activeCategory === tab.category}">
          ${tab.label}
        </button>
      `).join("");
    }

    function renderLinkList() {
      const  container = document.querySelector("#link-list");
      const visible = getVisibleLinks();
      document.querySelector("#link-count").textContent = visible.length;

      container.innerHTML = visible.length
        ? visible.map(link => linkCard(link)).join("")
        : `<li class="p-8 text-center"><p class="font-semibold text-slate-700 dark:text-[#f4eee5]">Tautan tidak ditemukan</p><p class="mt-1 text-sm text-slate-500 dark:text-[#c2b3a2]">Coba kata kunci atau kategori lain.</p></li>`;
    }

    function renderProducts() {
      document.querySelector("#product-list").innerHTML = products.map(product => `
        <article class="group overflow-hidden rounded-2xl border border-[#ebe3d8] bg-white shadow-[0_5px_20px_rgba(84,54,31,0.035)] transition duration-200 hover:-translate-y-1 hover:border-[#d9c3a8] hover:shadow-[0_12px_28px_rgba(84,54,31,0.09)] dark:border-[#403329] dark:bg-[#211b16]">
          <div class="h-44 overflow-hidden bg-[#f3eadf]">
            <img class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-slate-800 dark:text-[#f4eee5]">${escapeHtml(product.name)}</h3>
            <p class="mt-1 min-h-10 text-xs leading-5 text-slate-500 dark:text-[#c2b3a2]">${escapeHtml(product.description)}</p>
            <div class="mt-3 flex items-center justify-between gap-3">
              <p class="font-extrabold text-[#7b3f20] dark:text-[#d9a77e]">${formatRupiah(product.price)}</p>
              <a href="https://wa.me/${businessContact}?text=${encodeURIComponent(`Halo Karya Lokal, saya tertarik dengan ${product.name}.`)}"
                target="_blank" rel="noopener noreferrer" aria-label="Pesan ${escapeHtml(product.name)} melalui WhatsApp"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5ead9] text-lg text-[#704126] transition duration-200 hover:scale-110 hover:bg-[#7b3f20] hover:text-white dark:bg-[#3a2b20] dark:text-[#f5d8b6]">🛒</a>
            </div>
          </div>
        </article>
      `).join("");
    }

    function renderTheme() {
      const isDark = state.theme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      const button = document.querySelector("#theme-toggle");
      button.textContent = isDark ? "☾ Tema Terang" : "☼ Ganti Tema";
      button.setAttribute("aria-pressed", String(isDark));
      document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#17130f" : "#f8f6f1");
      localStorage.setItem("karya-lokal-theme", state.theme);
    }

    document.querySelector("#search-links").addEventListener("input", event => {
      state.searchQuery = event.target.value;
      renderFeaturedLinks();
      renderLinkList();
    });

    document.querySelector("#filter-tabs").addEventListener("click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      state.activeCategory = button.dataset.category;
      renderFilterTabs();
      renderLinkList();
    });

    document.querySelector("#theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      renderTheme();
    });

    document.querySelector("#copy-contact").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("+62 812 3456 7890");
        showMessage("Nomor kontak berhasil disalin.");
      } catch {
        showMessage("Clipboard tidak tersedia. Salin nomor: +62 812 3456 7890", true);
      }
    });

    document.querySelector("#share-page").addEventListener("click", async () => {
      const shareData = {
        title: "Karya Lokal",
        text: "Kerajinan Kayu Handmade — Karya Lokal",
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          showMessage("Tautan halaman berhasil disalin.");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          showMessage("Halaman tidak bisa dibagikan dari browser ini.", true);
        }
      }
    });

    renderSocialLinks();
    renderFeaturedLinks();
    renderFilterTabs();
    renderLinkList();
    renderProducts();
    renderTheme();

    



