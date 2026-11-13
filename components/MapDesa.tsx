'use client'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'

// Koordinat pusat desa. Sesuaikan jika pin belum tepat di kantor desa.
const CENTER: [number, number] = [3.0167, 98.7167]

const pin = L.divIcon({
  className: '',
  html: '<div style="width:22px;height:22px;border-radius:50% 50% 50% 0;background:#C89B3C;border:3px solid #1E3F20;transform:rotate(-45deg);box-shadow:0 4px 8px rgba(0,0,0,.4)"></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 24],
})

const layers = {
  satelit: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attr: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  },
  jalan: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
} as const

export default function MapDesa() {
  const [mode, setMode] = useState<'satelit' | 'jalan'>('satelit')
  const l = layers[mode]
  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-2xl border border-forest/15 shadow-[0_18px_40px_-18px_rgba(30,63,32,0.45)]">
      <MapContainer center={CENTER} zoom={15} maxZoom={18} scrollWheelZoom className="h-full w-full">
        <TileLayer key={mode} url={l.url} attribution={l.attr} maxZoom={18} />
        <Marker position={CENTER} icon={pin}>
          <Tooltip permanent direction="top" offset={[0, -24]}>Desa Saran Padang</Tooltip>
        </Marker>
      </MapContainer>

      <div className="absolute right-3 top-3 z-[1000] flex rounded-full bg-cream/95 p-1 text-xs font-semibold shadow-md">
        {([['satelit', 'Satelit'], ['jalan', 'Peta Jalan']] as const).map(([k, t]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            aria-pressed={mode === k}
            className={`rounded-full px-3 py-1.5 transition ${mode === k ? 'bg-forest text-cream' : 'text-forest hover:bg-forest/10'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}