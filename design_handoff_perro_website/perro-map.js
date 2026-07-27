/* <perro-map> — Leaflet service-area map for Perro Grooming Co. Requires Leaflet loaded on the page. */
if (!customElements.get('perro-map')) customElements.define('perro-map', class extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    if (!this.style.height) this.style.height = '100%';
    const init = () => {
      if (!window.L || !this.isConnected || this._map) { if (!window.L) setTimeout(init, 120); return; }
      const map = L.map(this, { scrollWheelZoom: false }).setView([35.09, -85.23], 11);
      this._map = map;
      const mk = url => L.tileLayer(url, { subdomains: 'abcd', maxZoom: 19, attribution: '© OpenStreetMap contributors © CARTO' });
      const light = mk('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png');
      const dark = mk('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
      let isDark = false;
      light.addTo(map);
      // dark-mode toggle control
      const Toggle = L.Control.extend({
        options: { position: 'topright' },
        onAdd() {
          const btn = L.DomUtil.create('button');
          btn.textContent = 'Dark map';
          btn.style.cssText = 'font-family:Poppins,sans-serif;font-weight:600;font-size:12px;padding:8px 16px;border:none;border-radius:999px;cursor:pointer;background:#2B1D1B;color:#FFF6EB;box-shadow:0 2px 8px rgba(43,29,27,.3)';
          L.DomEvent.disableClickPropagation(btn);
          btn.onclick = () => {
            isDark = !isDark;
            map.removeLayer(isDark ? light : dark);
            map.addLayer(isDark ? dark : light);
            btn.textContent = isDark ? 'Light map' : 'Dark map';
            btn.style.background = isDark ? '#FFF6EB' : '#2B1D1B';
            btn.style.color = isDark ? '#2B1D1B' : '#FFF6EB';
          };
          return btn;
        }
      });
      map.addControl(new Toggle());
      // labeled area pins instead of radius circles
      const areas = [
        { n: 'Chattanooga', c: [35.0456, -85.3097], col: '#DB2265', fee: 'No travel fee' },
        { n: 'Red Bank', c: [35.1112, -85.2947], col: '#DB2265', fee: 'No travel fee' },
        { n: 'Hixson', c: [35.1573, -85.2680], col: '#DB2265', fee: 'No travel fee' },
        { n: 'Hamilton', c: [35.0367, -85.1560], col: '#FF8840', fee: '+$15 travel fee' },
      ];
      areas.forEach(a => {
        const icon = L.divIcon({
          className: '',
          html: '<div style="transform:translate(-50%,-50%);white-space:nowrap;display:inline-flex;align-items:center;gap:6px;background:' + a.col + ';color:#fff;font-family:Poppins,sans-serif;font-weight:600;font-size:12px;padding:6px 14px;border-radius:999px;box-shadow:0 2px 8px rgba(43,29,27,.35)"><span style="width:8px;height:8px;border-radius:50%;background:#fff"></span>' + a.n + '</div>',
          iconSize: [0, 0],
        });
        L.marker(a.c, { icon }).addTo(map)
          .bindPopup('<b style="font-family:Poppins,sans-serif">' + a.n + '</b><br>' + a.fee);
      });
      L.marker([35.0456, -85.3097]).addTo(map).bindPopup('<b style="font-family:Poppins,sans-serif">Perro Grooming Co.</b><br>Home base — we come to you!');
      setTimeout(() => map.invalidateSize(), 300);
    };
    requestAnimationFrame(init);
  }
  disconnectedCallback() { if (this._map) { this._map.remove(); this._map = null; } }
});
