/**
 * Lumina Gallery — Interactive Engine
 * Modular, performant, and feature-complete client-side gallery application
 */

(function() {
  'use strict';

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const STORAGE_KEY_FAVORITES = 'lumina_gallery_favorites_v1';
  const STORAGE_KEY_UPLOADS = 'lumina_gallery_custom_uploads_v1';

  // Load favorites from localStorage
  let savedFavorites = [];
  try {
    savedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITES)) || [];
  } catch (e) {
    savedFavorites = [];
  }
  const favoritesSet = new Set(savedFavorites);

  // Load custom uploads from localStorage
  let customUploads = [];
  try {
    customUploads = JSON.parse(localStorage.getItem(STORAGE_KEY_UPLOADS)) || [];
  } catch (e) {
    customUploads = [];
  }

  // Combined active dataset
  let allPhotos = [...customUploads, ...INITIAL_GALLERY_DATA];
  let filteredPhotos = [...allPhotos];

  // Gallery view & filter state
  let currentLayout = 'masonry';
  let currentCategory = 'all';
  let currentColorTone = 'all';
  let currentOrientation = 'all';
  let currentSort = 'featured';
  let searchQuery = '';
  let showFavoritesOnly = false;

  // Lightbox State
  let lightboxOpen = false;
  let activeIndex = 0;
  let zoomLevel = 1.0;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3.0;
  const ZOOM_STEP = 0.25;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  // Slideshow State
  let isSlideshowActive = false;
  let slideshowInterval = null;
  const SLIDESHOW_DELAY = 4500; // ms

  // Filter Adjustments State
  const defaultFilterValues = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    grayscale: 0,
    blur: 0,
    hueRotate: 0
  };
  let activeFilters = { ...defaultFilterValues };
  let activePreset = 'original';

  // Upload Draft
  let uploadDraftDataUrl = null;
  let uploadDraftDimensions = '4000 x 3000';

  // =========================================================================
  // DOM ELEMENT REFERENCES
  // =========================================================================
  const galleryContainer = document.getElementById('galleryContainer');
  const emptyState = document.getElementById('emptyState');
  const visibleCountEl = document.getElementById('visibleCount');
  const totalCountEl = document.getElementById('totalCount');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchWrapper = document.getElementById('searchWrapper');
  const categoryPillsContainer = document.getElementById('categoryPills');
  const colorSwatchesContainer = document.getElementById('colorSwatches');
  const selectOrientation = document.getElementById('selectOrientation');
  const selectSort = document.getElementById('selectSort');
  const btnFavoritesFilter = document.getElementById('btnFavoritesFilter');
  const navFavCountEl = document.getElementById('navFavCount');
  const btnResetFilters = document.getElementById('btnResetFilters');

  // Ambient Blobs
  const ambientBlob1 = document.getElementById('ambientBlob1');
  const ambientBlob2 = document.getElementById('ambientBlob2');
  const ambientBlob3 = document.getElementById('ambientBlob3');

  // Layout Buttons
  const layoutBtns = {
    masonry: document.getElementById('btnLayoutMasonry'),
    grid: document.getElementById('btnLayoutGrid'),
    square: document.getElementById('btnLayoutSquare'),
    spotlight: document.getElementById('btnLayoutSpotlight')
  };

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxImageWrapper = document.getElementById('lightboxImageWrapper');
  const lightboxStage = document.getElementById('lightboxStage');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxNavPrev = document.getElementById('lightboxNavPrev');
  const lightboxNavNext = document.getElementById('lightboxNavNext');
  const zoomIndicator = document.getElementById('zoomIndicator');
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnZoomReset = document.getElementById('btnZoomReset');
  const lightboxAuthorImg = document.getElementById('lightboxAuthorImg');
  const lightboxAuthorName = document.getElementById('lightboxAuthorName');
  const lightboxAuthorHandle = document.getElementById('lightboxAuthorHandle');
  const lightboxLikeBtn = document.getElementById('lightboxLikeBtn');
  const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
  const lightboxFullscreenBtn = document.getElementById('lightboxFullscreenBtn');
  const btnToggleSlideshow = document.getElementById('btnToggleSlideshow');
  const slideshowProgressBar = document.getElementById('slideshowProgressBar');
  const slideshowIcon = document.getElementById('slideshowIcon');
  const lightboxDrawer = document.getElementById('lightboxDrawer');
  const btnToggleInfoDrawer = document.getElementById('btnToggleInfoDrawer');
  const btnToggleFiltersDrawer = document.getElementById('btnToggleFiltersDrawer');
  const tabDetailsBtn = document.getElementById('tabDetailsBtn');
  const tabFiltersBtn = document.getElementById('tabFiltersBtn');
  const paneDetails = document.getElementById('paneDetails');
  const paneFilters = document.getElementById('paneFilters');

  // EXIF Elements in Drawer
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerDesc = document.getElementById('drawerDesc');
  const exifCamera = document.getElementById('exifCamera');
  const exifLens = document.getElementById('exifLens');
  const exifFocal = document.getElementById('exifFocal');
  const exifAperture = document.getElementById('exifAperture');
  const exifShutter = document.getElementById('exifShutter');
  const exifIso = document.getElementById('exifIso');
  const exifDimensions = document.getElementById('exifDimensions');
  const exifLocation = document.getElementById('exifLocation');
  const drawerPaletteChips = document.getElementById('drawerPaletteChips');
  const drawerTags = document.getElementById('drawerTags');

  // Filter Adjustments Elements
  const presetPillsGrid = document.getElementById('presetPillsGrid');
  const sliderBrightness = document.getElementById('sliderBrightness');
  const sliderContrast = document.getElementById('sliderContrast');
  const sliderSaturate = document.getElementById('sliderSaturate');
  const sliderSepia = document.getElementById('sliderSepia');
  const sliderGrayscale = document.getElementById('sliderGrayscale');
  const sliderHueRotate = document.getElementById('sliderHueRotate');
  const valBrightness = document.getElementById('valBrightness');
  const valContrast = document.getElementById('valContrast');
  const valSaturate = document.getElementById('valSaturate');
  const valSepia = document.getElementById('valSepia');
  const valGrayscale = document.getElementById('valGrayscale');
  const valHueRotate = document.getElementById('valHueRotate');
  const btnResetFiltersControls = document.getElementById('btnResetFiltersControls');
  const btnCopyCssFilter = document.getElementById('btnCopyCssFilter');

  // Upload Elements
  const uploadModal = document.getElementById('uploadModal');
  const btnOpenUploadModal = document.getElementById('btnOpenUploadModal');
  const btnCloseUploadModal = document.getElementById('btnCloseUploadModal');
  const uploadDropzone = document.getElementById('uploadDropzone');
  const uploadFileInput = document.getElementById('uploadFileInput');
  const uploadPreviewContainer = document.getElementById('uploadPreviewContainer');
  const uploadPreviewImg = document.getElementById('uploadPreviewImg');
  const uploadForm = document.getElementById('uploadForm');
  const uploadTitle = document.getElementById('uploadTitle');
  const uploadCategory = document.getElementById('uploadCategory');
  const uploadPhotographer = document.getElementById('uploadPhotographer');
  const uploadTags = document.getElementById('uploadTags');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    updateFavoritesBadge();
    initPresetsUI();
    bindEvents();
    applyFiltersAndRender();
  }

  // =========================================================================
  // GALLERY RENDERING
  // =========================================================================
  function applyFiltersAndRender() {
    filteredPhotos = allPhotos.filter(photo => {
      // 1. Favorites filter
      if (showFavoritesOnly && !favoritesSet.has(photo.id)) {
        return false;
      }

      // 2. Category filter
      if (currentCategory !== 'all' && photo.category !== currentCategory) {
        return false;
      }

      // 3. Orientation filter
      if (currentOrientation !== 'all' && photo.orientation !== currentOrientation) {
        return false;
      }

      // 4. Color tone filter
      if (currentColorTone !== 'all') {
        const matchesPrimary = photo.primaryColor && isColorClose(photo.primaryColor, currentColorTone);
        const matchesPalette = photo.palette && photo.palette.some(c => isColorClose(c, currentColorTone));
        if (!matchesPrimary && !matchesPalette) {
          return false;
        }
      }

      // 5. Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = photo.title.toLowerCase().includes(q);
        const inDesc = photo.description.toLowerCase().includes(q);
        const inTags = photo.tags && photo.tags.some(t => t.toLowerCase().includes(q));
        const inAuthor = photo.photographer.name.toLowerCase().includes(q) || photo.photographer.handle.toLowerCase().includes(q);
        const inLocation = photo.exif && photo.exif.location && photo.exif.location.toLowerCase().includes(q);
        const inCamera = photo.exif && photo.exif.camera && photo.exif.camera.toLowerCase().includes(q);

        if (!inTitle && !inDesc && !inTags && !inAuthor && !inLocation && !inCamera) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    if (currentSort === 'likes') {
      filteredPhotos.sort((a, b) => b.likes - a.likes);
    } else if (currentSort === 'newest') {
      filteredPhotos.sort((a, b) => (b.id > a.id ? 1 : -1));
    }

    renderCards();
    updateStatsCounter();
  }

  function renderCards() {
    galleryContainer.innerHTML = '';

    if (filteredPhotos.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    filteredPhotos.forEach((photo, index) => {
      const isLiked = favoritesSet.has(photo.id);
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.dataset.id = photo.id;
      card.dataset.index = index;
      card.style.setProperty('--card-glow', photo.primaryColor || 'rgba(139, 92, 246, 0.4)');

      card.innerHTML = `
        <div class="card-media-wrapper">
          <div class="card-badges">
            <span class="badge-tag">${escapeHtml(photo.category)}</span>
          </div>
          <button class="card-like-btn ${isLiked ? 'liked' : ''}" data-photo-id="${photo.id}" title="${isLiked ? 'Unlike' : 'Like'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <img 
            src="${photo.thumbnailUrl || photo.url}" 
            alt="${escapeHtml(photo.title)}" 
            class="card-image"
            loading="lazy"
          >
          <div class="card-overlay">
            <h3 class="card-title">${escapeHtml(photo.title)}</h3>
            <div class="card-footer">
              <div class="card-photographer">
                <img src="${photo.photographer.avatar}" alt="${escapeHtml(photo.photographer.name)}" class="card-avatar">
                <span>${escapeHtml(photo.photographer.name)}</span>
              </div>
              <div class="card-meta-stats">
                <span class="card-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  ${photo.views || '12K'}
                </span>
                <span class="card-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <span class="card-like-count">${photo.likes + (isLiked ? 1 : 0)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Image loaded event to remove shimmer skeleton
      const img = card.querySelector('.card-image');
      const mediaWrapper = card.querySelector('.card-media-wrapper');
      img.addEventListener('load', () => {
        mediaWrapper.classList.add('loaded');
      });
      if (img.complete) {
        mediaWrapper.classList.add('loaded');
      }

      // Card hover changes ambient background glow color subtly
      card.addEventListener('mouseenter', () => {
        setAmbientGlow(photo.primaryColor || '#8b5cf6');
      });

      // Card click opens lightbox
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-like-btn')) {
          e.stopPropagation();
          toggleFavorite(photo.id);
          return;
        }
        openLightbox(index);
      });

      galleryContainer.appendChild(card);
    });
  }

  function updateStatsCounter() {
    visibleCountEl.textContent = filteredPhotos.length;
    totalCountEl.textContent = allPhotos.length;
  }

  function updateFavoritesBadge() {
    navFavCountEl.textContent = favoritesSet.size;
  }

  // =========================================================================
  // AMBIENT BACKGROUND GLOW ENGINE
  // =========================================================================
  function setAmbientGlow(primaryHex) {
    if (!primaryHex) return;
    ambientBlob1.style.background = `radial-gradient(circle, ${primaryHex} 0%, rgba(0,0,0,0) 70%)`;
  }

  // Helper to test if hex colors share dominant tonality
  function isColorClose(hex1, hex2) {
    if (!hex1 || !hex2) return false;
    if (hex1.toLowerCase() === hex2.toLowerCase()) return true;
    return false;
  }

  // =========================================================================
  // FAVORITES MANAGEMENT
  // =========================================================================
  function toggleFavorite(photoId) {
    const isNowLiked = !favoritesSet.has(photoId);
    if (isNowLiked) {
      favoritesSet.add(photoId);
      showToast('Saved to Favorites', '<svg width="18" height="18" viewBox="0 0 24 24" fill="#f43f5e"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>');
    } else {
      favoritesSet.delete(photoId);
      showToast('Removed from Favorites');
    }

    // Persist
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify([...favoritesSet]));
    updateFavoritesBadge();

    // Update card buttons
    document.querySelectorAll(`.card-like-btn[data-photo-id="${photoId}"]`).forEach(btn => {
      btn.classList.toggle('liked', isNowLiked);
      const icon = btn.querySelector('svg');
      if (icon) icon.setAttribute('fill', isNowLiked ? 'currentColor' : 'none');
      const countSpan = btn.closest('.gallery-card')?.querySelector('.card-like-count');
      if (countSpan) {
        const photo = allPhotos.find(p => p.id === photoId);
        if (photo) {
          countSpan.textContent = photo.likes + (isNowLiked ? 1 : 0);
        }
      }
    });

    // Update lightbox like button if open
    if (lightboxOpen && filteredPhotos[activeIndex]?.id === photoId) {
      lightboxLikeBtn.classList.toggle('active', isNowLiked);
      const icon = lightboxLikeBtn.querySelector('svg');
      if (icon) icon.setAttribute('fill', isNowLiked ? 'currentColor' : 'none');
    }

    // If viewing favorites only, re-filter
    if (showFavoritesOnly) {
      applyFiltersAndRender();
    }
  }

  // =========================================================================
  // PRO LIGHTBOX VIEWER
  // =========================================================================
  function openLightbox(index) {
    if (index < 0 || index >= filteredPhotos.length) return;
    activeIndex = index;
    lightboxOpen = true;

    // Reset zoom and pan
    resetZoomAndPan();

    // Reset filter preset
    resetFilterAdjustments();

    // Populate photo data
    loadLightboxPhoto(filteredPhotos[activeIndex]);

    // Show modal
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOpen = false;
    stopSlideshow();
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function loadLightboxPhoto(photo) {
    if (!photo) return;

    // Image load with smooth transition
    lightboxImg.style.opacity = '0';
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.title;

    lightboxImg.onload = () => {
      lightboxImg.style.opacity = '1';
    };

    // Ambient glow in lightbox
    setAmbientGlow(photo.primaryColor || '#8b5cf6');

    // Author info
    lightboxAuthorImg.src = photo.photographer.avatar;
    lightboxAuthorName.textContent = photo.photographer.name;
    lightboxAuthorHandle.textContent = photo.photographer.handle;

    // Details drawer
    drawerTitle.textContent = photo.title;
    drawerDesc.textContent = photo.description;

    // EXIF
    const exif = photo.exif || {};
    exifCamera.textContent = exif.camera || 'Standard Sensor';
    exifLens.textContent = exif.lens || 'Prime Lens';
    exifFocal.textContent = exif.focalLength || '50mm';
    exifAperture.textContent = exif.aperture || 'f/2.8';
    exifShutter.textContent = exif.shutterSpeed || '1/200s';
    exifIso.textContent = exif.iso ? `ISO ${exif.iso}` : 'ISO 100';
    exifDimensions.textContent = exif.dimensions || 'High Resolution';
    exifLocation.textContent = exif.location || 'Unknown Location';

    // Palette chips
    drawerPaletteChips.innerHTML = '';
    const palette = photo.palette || [photo.primaryColor || '#8b5cf6'];
    palette.forEach(colorHex => {
      const chip = document.createElement('div');
      chip.className = 'palette-chip';
      chip.style.backgroundColor = colorHex;
      chip.textContent = colorHex.toUpperCase();
      chip.title = `Click to copy ${colorHex}`;
      chip.addEventListener('click', () => {
        navigator.clipboard.writeText(colorHex).then(() => {
          showToast(`Copied ${colorHex} to clipboard!`);
        });
      });
      drawerPaletteChips.appendChild(chip);
    });

    // Tags
    drawerTags.innerHTML = '';
    (photo.tags || []).forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'drawer-tag';
      tagEl.textContent = `#${tag}`;
      tagEl.style.cursor = 'pointer';
      tagEl.addEventListener('click', () => {
        closeLightbox();
        searchInput.value = tag;
        searchQuery = tag;
        searchWrapper.classList.add('has-text');
        applyFiltersAndRender();
      });
      drawerTags.appendChild(tagEl);
    });

    // Like button state
    const isLiked = favoritesSet.has(photo.id);
    lightboxLikeBtn.classList.toggle('active', isLiked);
    const icon = lightboxLikeBtn.querySelector('svg');
    if (icon) icon.setAttribute('fill', isLiked ? 'currentColor' : 'none');

    // Download action
    lightboxDownloadBtn.onclick = () => {
      downloadPhoto(photo);
    };

    // Apply active filters to image
    applyActiveFiltersToImage();
  }

  function navigateLightbox(direction) {
    if (filteredPhotos.length === 0) return;
    activeIndex = (activeIndex + direction + filteredPhotos.length) % filteredPhotos.length;
    resetZoomAndPan();
    loadLightboxPhoto(filteredPhotos[activeIndex]);

    if (isSlideshowActive) {
      restartSlideshowTimer();
    }
  }

  // =========================================================================
  // PAN & ZOOM SYSTEM
  // =========================================================================
  function updateZoomAndPan() {
    lightboxImageWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    zoomIndicator.textContent = `${Math.round(zoomLevel * 100)}%`;

    if (zoomLevel > 1) {
      lightboxImageWrapper.style.cursor = isDragging ? 'grabbing' : 'grab';
    } else {
      lightboxImageWrapper.style.cursor = 'default';
      panX = 0;
      panY = 0;
    }
  }

  function setZoom(newZoom) {
    zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number(newZoom.toFixed(2))));
    if (zoomLevel <= 1) {
      panX = 0;
      panY = 0;
    }
    updateZoomAndPan();
  }

  function resetZoomAndPan() {
    zoomLevel = 1.0;
    panX = 0;
    panY = 0;
    updateZoomAndPan();
  }

  // =========================================================================
  // SLIDESHOW AUTOPLAY
  // =========================================================================
  function toggleSlideshow() {
    if (isSlideshowActive) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  function startSlideshow() {
    isSlideshowActive = true;
    btnToggleSlideshow.classList.add('active');
    slideshowIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
    showToast('Slideshow playback started');
    restartSlideshowTimer();
  }

  function stopSlideshow() {
    isSlideshowActive = false;
    btnToggleSlideshow.classList.remove('active');
    slideshowIcon.innerHTML = '<polygon points="5 3 19 12 5 3"></polygon>';
    if (slideshowInterval) {
      clearTimeout(slideshowInterval);
      slideshowInterval = null;
    }
    slideshowProgressBar.style.transition = 'none';
    slideshowProgressBar.style.width = '0%';
  }

  function restartSlideshowTimer() {
    if (!isSlideshowActive) return;
    if (slideshowInterval) clearTimeout(slideshowInterval);

    // Reset progress bar animation
    slideshowProgressBar.style.transition = 'none';
    slideshowProgressBar.style.width = '0%';

    requestAnimationFrame(() => {
      slideshowProgressBar.style.transition = `width ${SLIDESHOW_DELAY}ms linear`;
      slideshowProgressBar.style.width = '100%';
    });

    slideshowInterval = setTimeout(() => {
      if (isSlideshowActive && lightboxOpen) {
        navigateLightbox(1);
      }
    }, SLIDESHOW_DELAY);
  }

  // =========================================================================
  // LIVE PHOTO FILTERS & ADJUSTMENTS
  // =========================================================================
  function initPresetsUI() {
    presetPillsGrid.innerHTML = '';
    Object.keys(FILTER_PRESETS).forEach(key => {
      const preset = FILTER_PRESETS[key];
      const btn = document.createElement('button');
      btn.className = `preset-btn ${key === 'original' ? 'active' : ''}`;
      btn.dataset.preset = key;
      btn.textContent = preset.name;
      btn.addEventListener('click', () => {
        applyPreset(key);
      });
      presetPillsGrid.appendChild(btn);
    });
  }

  function applyPreset(presetKey) {
    const preset = FILTER_PRESETS[presetKey];
    if (!preset) return;
    activePreset = presetKey;

    // Update preset pills active class
    presetPillsGrid.querySelectorAll('.preset-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.preset === presetKey);
    });

    activeFilters = { ...preset.filters };
    syncSliderInputsFromState();
    applyActiveFiltersToImage();
    showToast(`Applied preset: ${preset.name}`);
  }

  function syncSliderInputsFromState() {
    sliderBrightness.value = activeFilters.brightness;
    valBrightness.textContent = `${activeFilters.brightness}%`;

    sliderContrast.value = activeFilters.contrast;
    valContrast.textContent = `${activeFilters.contrast}%`;

    sliderSaturate.value = activeFilters.saturate;
    valSaturate.textContent = `${activeFilters.saturate}%`;

    sliderSepia.value = activeFilters.sepia;
    valSepia.textContent = `${activeFilters.sepia}%`;

    sliderGrayscale.value = activeFilters.grayscale;
    valGrayscale.textContent = `${activeFilters.grayscale}%`;

    sliderHueRotate.value = activeFilters.hueRotate;
    valHueRotate.textContent = `${activeFilters.hueRotate}°`;
  }

  function applyActiveFiltersToImage() {
    const f = activeFilters;
    const filterString = `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) sepia(${f.sepia}%) grayscale(${f.grayscale}%) blur(${f.blur}px) hue-rotate(${f.hueRotate}deg)`;
    lightboxImg.style.filter = filterString;
  }

  function resetFilterAdjustments() {
    activeFilters = { ...defaultFilterValues };
    activePreset = 'original';
    syncSliderInputsFromState();
    if (presetPillsGrid) {
      presetPillsGrid.querySelectorAll('.preset-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.preset === 'original');
      });
    }
    applyActiveFiltersToImage();
  }

  // =========================================================================
  // DOWNLOAD ACTION
  // =========================================================================
  function downloadPhoto(photo) {
    showToast(`Preparing high-res download for "${photo.title}"...`);
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_lumina.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // =========================================================================
  // CUSTOM PHOTO UPLOAD
  // =========================================================================
  function handleUploadedFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP, AVIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      uploadDraftDataUrl = e.target.result;
      uploadPreviewImg.src = uploadDraftDataUrl;
      uploadPreviewContainer.style.display = 'block';

      // Detect dimensions
      const tempImg = new Image();
      tempImg.onload = () => {
        uploadDraftDimensions = `${tempImg.naturalWidth} x ${tempImg.naturalHeight}`;
      };
      tempImg.src = uploadDraftDataUrl;
    };
    reader.readAsDataURL(file);
  }

  // =========================================================================
  // TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message, iconSvgHtml) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const defaultIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="toast-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    toast.innerHTML = `${iconSvgHtml || defaultIcon}<span>${escapeHtml(message)}</span>`;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================
  function bindEvents() {
    // Search input
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      searchWrapper.classList.toggle('has-text', searchQuery.length > 0);
      applyFiltersAndRender();
    });

    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchWrapper.classList.remove('has-text');
      searchInput.focus();
      applyFiltersAndRender();
    });

    // Category pills
    categoryPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      categoryPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      showFavoritesOnly = false;
      btnFavoritesFilter.classList.remove('btn-primary');
      btnFavoritesFilter.classList.add('btn-glass');
      applyFiltersAndRender();
    });

    // Dominant Color Swatches
    colorSwatchesContainer.addEventListener('click', (e) => {
      const swatch = e.target.closest('.color-swatch-btn');
      if (!swatch) return;
      colorSwatchesContainer.querySelectorAll('.color-swatch-btn').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      currentColorTone = swatch.dataset.color;
      applyFiltersAndRender();
    });

    // Orientation selector
    selectOrientation.addEventListener('change', (e) => {
      currentOrientation = e.target.value;
      applyFiltersAndRender();
    });

    // Sort selector
    selectSort.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });

    // Favorites filter button in Navbar
    btnFavoritesFilter.addEventListener('click', () => {
      showFavoritesOnly = !showFavoritesOnly;
      if (showFavoritesOnly) {
        btnFavoritesFilter.classList.remove('btn-glass');
        btnFavoritesFilter.classList.add('btn-primary');
        categoryPillsContainer.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      } else {
        btnFavoritesFilter.classList.remove('btn-primary');
        btnFavoritesFilter.classList.add('btn-glass');
        const allPill = categoryPillsContainer.querySelector('[data-category="all"]');
        if (allPill) allPill.classList.add('active');
        currentCategory = 'all';
      }
      applyFiltersAndRender();
    });

    // Reset All Filters button in Empty State
    btnResetFilters.addEventListener('click', () => {
      searchQuery = '';
      searchInput.value = '';
      searchWrapper.classList.remove('has-text');
      currentCategory = 'all';
      categoryPillsContainer.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.category === 'all');
      });
      currentColorTone = 'all';
      colorSwatchesContainer.querySelectorAll('.color-swatch-btn').forEach(s => {
        s.classList.toggle('active', s.dataset.color === 'all');
      });
      currentOrientation = 'all';
      selectOrientation.value = 'all';
      currentSort = 'featured';
      selectSort.value = 'featured';
      showFavoritesOnly = false;
      btnFavoritesFilter.classList.remove('btn-primary');
      btnFavoritesFilter.classList.add('btn-glass');
      applyFiltersAndRender();
    });

    // Layout Switcher
    Object.keys(layoutBtns).forEach(key => {
      const btn = layoutBtns[key];
      btn.addEventListener('click', () => {
        Object.values(layoutBtns).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLayout = key;

        galleryContainer.className = `gallery-container layout-${key}`;
        showToast(`Switched to ${key.toUpperCase()} view`);
      });
    });

    // Lightbox Close
    lightboxCloseBtn.addEventListener('click', closeLightbox);

    // Lightbox Nav Prev / Next
    lightboxNavPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNavNext.addEventListener('click', () => navigateLightbox(1));

    // Lightbox Like
    lightboxLikeBtn.addEventListener('click', () => {
      const activePhoto = filteredPhotos[activeIndex];
      if (activePhoto) toggleFavorite(activePhoto.id);
    });

    // Lightbox Slideshow Toggle
    btnToggleSlideshow.addEventListener('click', toggleSlideshow);

    // Fullscreen Toggle
    lightboxFullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          showToast(`Error attempting fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });

    // Lightbox Drawers Toggle
    btnToggleInfoDrawer.addEventListener('click', () => {
      const isOpen = lightboxDrawer.classList.contains('open') && tabDetailsBtn.classList.contains('active');
      if (isOpen) {
        lightboxDrawer.classList.remove('open');
        btnToggleInfoDrawer.classList.remove('active');
      } else {
        lightboxDrawer.classList.add('open');
        btnToggleInfoDrawer.classList.add('active');
        btnToggleFiltersDrawer.classList.remove('active');
        tabDetailsBtn.classList.add('active');
        tabFiltersBtn.classList.remove('active');
        paneDetails.classList.add('active');
        paneFilters.classList.remove('active');
      }
    });

    btnToggleFiltersDrawer.addEventListener('click', () => {
      const isOpen = lightboxDrawer.classList.contains('open') && tabFiltersBtn.classList.contains('active');
      if (isOpen) {
        lightboxDrawer.classList.remove('open');
        btnToggleFiltersDrawer.classList.remove('active');
      } else {
        lightboxDrawer.classList.add('open');
        btnToggleFiltersDrawer.classList.add('active');
        btnToggleInfoDrawer.classList.remove('active');
        tabFiltersBtn.classList.add('active');
        tabDetailsBtn.classList.remove('active');
        paneFilters.classList.add('active');
        paneDetails.classList.remove('active');
      }
    });

    // Drawer Tabs
    tabDetailsBtn.addEventListener('click', () => {
      tabDetailsBtn.classList.add('active');
      tabFiltersBtn.classList.remove('active');
      paneDetails.classList.add('active');
      paneFilters.classList.remove('active');
      btnToggleInfoDrawer.classList.add('active');
      btnToggleFiltersDrawer.classList.remove('active');
    });

    tabFiltersBtn.addEventListener('click', () => {
      tabFiltersBtn.classList.add('active');
      tabDetailsBtn.classList.remove('active');
      paneFilters.classList.add('active');
      paneDetails.classList.remove('active');
      btnToggleFiltersDrawer.classList.add('active');
      btnToggleInfoDrawer.classList.remove('active');
    });

    // Zoom Controls
    btnZoomIn.addEventListener('click', () => setZoom(zoomLevel + ZOOM_STEP));
    btnZoomOut.addEventListener('click', () => setZoom(zoomLevel - ZOOM_STEP));
    btnZoomReset.addEventListener('click', resetZoomAndPan);

    // Mouse Wheel Zooming in Lightbox Stage
    lightboxStage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setZoom(zoomLevel + delta);
    }, { passive: false });

    // Pan & Drag in Lightbox Image Wrapper
    lightboxImageWrapper.addEventListener('mousedown', (e) => {
      if (zoomLevel <= 1) return;
      isDragging = true;
      dragStartX = e.clientX - panX;
      dragStartY = e.clientY - panY;
      lightboxImageWrapper.classList.add('panning');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = e.clientX - dragStartX;
      panY = e.clientY - dragStartY;
      updateZoomAndPan();
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        lightboxImageWrapper.classList.remove('panning');
      }
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleSlideshow();
      } else if (e.key === 'f' || e.key === 'F') {
        lightboxFullscreenBtn.click();
      } else if (e.key === 'i' || e.key === 'I') {
        btnToggleInfoDrawer.click();
      } else if (e.key === '+' || e.key === '=') {
        setZoom(zoomLevel + ZOOM_STEP);
      } else if (e.key === '-') {
        setZoom(zoomLevel - ZOOM_STEP);
      } else if (e.key === '0') {
        resetZoomAndPan();
      }
    });

    // Sliders for Photo Adjustments
    const sliderMap = [
      { slider: sliderBrightness, label: valBrightness, key: 'brightness', unit: '%' },
      { slider: sliderContrast, label: valContrast, key: 'contrast', unit: '%' },
      { slider: sliderSaturate, label: valSaturate, key: 'saturate', unit: '%' },
      { slider: sliderSepia, label: valSepia, key: 'sepia', unit: '%' },
      { slider: sliderGrayscale, label: valGrayscale, key: 'grayscale', unit: '%' },
      { slider: sliderHueRotate, label: valHueRotate, key: 'hueRotate', unit: '°' },
    ];

    sliderMap.forEach(({ slider, label, key, unit }) => {
      slider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        activeFilters[key] = val;
        label.textContent = `${val}${unit}`;
        applyActiveFiltersToImage();
      });
    });

    btnResetFiltersControls.addEventListener('click', () => {
      resetFilterAdjustments();
      showToast('Filters reset to original');
    });

    btnCopyCssFilter.addEventListener('click', () => {
      const f = activeFilters;
      const cssString = `filter: brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) sepia(${f.sepia}%) grayscale(${f.grayscale}%) hue-rotate(${f.hueRotate}deg);`;
      navigator.clipboard.writeText(cssString).then(() => {
        showToast('CSS filter string copied!');
      });
    });

    // Upload Modal Handling
    btnOpenUploadModal.addEventListener('click', () => {
      uploadModal.classList.add('active');
      uploadModal.setAttribute('aria-hidden', 'false');
    });

    btnCloseUploadModal.addEventListener('click', () => {
      uploadModal.classList.remove('active');
      uploadModal.setAttribute('aria-hidden', 'true');
    });

    uploadDropzone.addEventListener('click', () => {
      uploadFileInput.click();
    });

    uploadFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleUploadedFile(e.target.files[0]);
      }
    });

    uploadDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadDropzone.classList.add('dragover');
    });

    uploadDropzone.addEventListener('dragleave', () => {
      uploadDropzone.classList.remove('dragover');
    });

    uploadDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleUploadedFile(e.dataTransfer.files[0]);
      }
    });

    // Form submission for Upload
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!uploadDraftDataUrl) {
        showToast('Please upload or drop an image first.');
        return;
      }

      const title = uploadTitle.value.trim() || 'Untitled Photograph';
      const category = uploadCategory.value;
      const photographerHandle = uploadPhotographer.value.trim() || '@creator';
      const photographerName = photographerHandle.replace(/^@/, '');
      const tags = uploadTags.value
        ? uploadTags.value.split(',').map(t => t.trim()).filter(Boolean)
        : [category, 'UserUpload'];

      const newPhoto = {
        id: `upload-${Date.now()}`,
        title,
        description: `Custom captured masterpiece published by ${photographerHandle}.`,
        category,
        photographer: {
          name: photographerName,
          handle: photographerHandle.startsWith('@') ? photographerHandle : `@${photographerHandle}`,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        },
        url: uploadDraftDataUrl,
        thumbnailUrl: uploadDraftDataUrl,
        orientation: 'landscape',
        aspectRatio: '16/9',
        likes: 1,
        views: '1',
        palette: ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#ffffff"],
        primaryColor: "#8b5cf6",
        tags,
        exif: {
          camera: "Pro Mirrorless / Mobile RAW",
          lens: "Prime Sharp Focus",
          focalLength: "35mm",
          aperture: "f/2.0",
          shutterSpeed: "1/250s",
          iso: "100",
          dimensions: uploadDraftDimensions,
          location: "Uploaded by User",
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
      };

      // Add to front of array
      allPhotos.unshift(newPhoto);
      customUploads.unshift(newPhoto);

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY_UPLOADS, JSON.stringify(customUploads));
      } catch (err) {
        console.warn('LocalStorage limit reached for custom uploads', err);
      }

      // Reset form
      uploadForm.reset();
      uploadDraftDataUrl = null;
      uploadPreviewContainer.style.display = 'none';
      uploadModal.classList.remove('active');

      // Refresh gallery
      applyFiltersAndRender();
      showToast(`"${title}" published to your gallery!`);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Self-start
  init();

})();
