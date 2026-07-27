import { useEffect, useRef } from 'react'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import './PerroMap.css'

// Vite bundles Leaflet's default marker images under hashed URLs; point the
// default icon at them explicitly or the home-base pin renders as a broken image.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const AREAS = [
  { n: 'Chattanooga', c: [35.0456, -85.3097] as [number, number], col: '#DB2265', fee: 'No travel fee' },
  { n: 'Red Bank', c: [35.1112, -85.2947] as [number, number], col: '#DB2265', fee: 'No travel fee' },
  { n: 'Hixson', c: [35.1573, -85.268] as [number, number], col: '#DB2265', fee: 'No travel fee' },
  { n: 'Hamilton', c: [35.0367, -85.156] as [number, number], col: '#FF8840', fee: '+$15 travel fee' },
]

export default function PerroMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([35.09, -85.23], 11)
    mapRef.current = map

    const tileLayer = (url: string) =>
      L.tileLayer(url, {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors © CARTO',
      })
    const light = tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
    const dark = tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')
    let isDark = false
    light.addTo(map)

    const Toggle = L.Control.extend({
      options: { position: 'topright' },
      onAdd() {
        const btn = L.DomUtil.create('button')
        btn.textContent = 'Dark map'
        btn.style.cssText =
          'font-family:Poppins,sans-serif;font-weight:600;font-size:12px;padding:8px 16px;border:none;border-radius:999px;cursor:pointer;background:#2B1D1B;color:#FFF6EB;box-shadow:0 2px 8px rgba(43,29,27,.3)'
        L.DomEvent.disableClickPropagation(btn)
        btn.onclick = () => {
          isDark = !isDark
          map.removeLayer(isDark ? light : dark)
          map.addLayer(isDark ? dark : light)
          btn.textContent = isDark ? 'Light map' : 'Dark map'
          btn.style.background = isDark ? '#FFF6EB' : '#2B1D1B'
          btn.style.color = isDark ? '#2B1D1B' : '#FFF6EB'
        }
        return btn
      },
    })
    map.addControl(new Toggle())

    AREAS.forEach((a) => {
      const icon = L.divIcon({
        className: '',
        html:
          '<div style="transform:translate(-50%,-50%);white-space:nowrap;display:inline-flex;align-items:center;gap:6px;background:' +
          a.col +
          ';color:#fff;font-family:Poppins,sans-serif;font-weight:600;font-size:12px;padding:6px 14px;border-radius:999px;box-shadow:0 2px 8px rgba(43,29,27,.35)"><span style="width:8px;height:8px;border-radius:50%;background:#fff"></span>' +
          a.n +
          '</div>',
        iconSize: [0, 0],
      })
      L.marker(a.c, { icon })
        .addTo(map)
        .bindPopup('<b style="font-family:Poppins,sans-serif">' + a.n + '</b><br>' + a.fee)
    })

    L.marker([35.0456, -85.3097])
      .addTo(map)
      .bindPopup('<b style="font-family:Poppins,sans-serif">Perro Grooming Co.</b><br>Home base — we come to you!')

    const resizeTimer = setTimeout(() => map.invalidateSize(), 300)

    return () => {
      clearTimeout(resizeTimer)
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="perro-map" />
}
