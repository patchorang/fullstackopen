import 'leaflet/dist/leaflet.css'
import gpxParser from 'gpxparser'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
import { useState } from 'react'

const SingleFileUploader = () => {
  const [file, setFile] = useState(null)
  const [gpxData, setGpxData] = useState(null)

  const readFileAsString = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        resolve(event.target.result)
      }

      reader.onerror = (error) => {
        reject(error)
      }

      reader.readAsText(file)
    })
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      readFileAsString(e.target.files[0])
        .then((fileContents) => {
          var gpx = new gpxParser()
          gpx.parse(fileContents)
          setGpxData(gpx)
          // console.log(gpx.tracks[0].distance.total)
        })
        .catch((error) => {
          console.error('error reading file:', error)
        })
    }
  }

  const handleUpload = async () => {
    //TODO
  }

  const metersToMiles = (meters) => {
    const METERS_PER_MILE = 1609.34
    return meters / METERS_PER_MILE
  }

  const getGPXData = () => {
    const startTime = gpxData.tracks[0].points[0].time
    const endTime =
      gpxData.tracks[0].points[gpxData.tracks[0].points.length - 1].time

    const elapsedTime = (endTime - startTime) / (60 * 1000)
    const elapsedMinutes = elapsedTime % 60
    const elapsedHours = Math.floor(elapsedTime / 60)

    return (
      <div>
        <h1>GPX Data</h1>
        <div>Miles: {metersToMiles(gpxData.tracks[0].distance.total)}</div>
        <div>
          Time: {elapsedHours}:{elapsedMinutes}
        </div>
      </div>
    )
  }

  const getRouteBounds = (gpx) => {
    let minLat = 90
    let maxLat = -90
    let minLon = 180
    let maxLon = -180

    for (const point of gpx.tracks[0].points) {
      const lat = point.lat
      const lon = point.lon
      if (minLat > lat) {
        minLat = lat
      }
      if (maxLat < lat) {
        maxLat = lat
      }
      if (minLon > lon) {
        minLon = lon
      }
      if (maxLon < lon) {
        maxLon = lon
      }
    }

    return [
      [minLat, minLon],
      [maxLat, maxLon],
    ]
  }

  const getRoutePositions = (gpx) => {
    return gpx.tracks[0].points.map((point) => [point.lat, point.lon])
  }

  const showMap = () => {
    return (
      <MapContainer
        id="map"
        bounds={getRouteBounds(gpxData)}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline
          pathOptions={{ fillColor: 'red', color: 'blue' }}
          positions={getRoutePositions(gpxData)}
        />
      </MapContainer>
    )
  }

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>

      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}
      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a file
        </button>
      )}
      {gpxData && getGPXData()}
      {gpxData && showMap()}
    </>
  )
}

export default SingleFileUploader
