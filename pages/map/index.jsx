import React, { Component } from 'react';
if (process.env.BROWSER) {
    var L = require("leaflet");
    var Map = require('react-leaflet').Map;
    var TileLayer = require('react-leaflet').TileLayer;
    var Marker = require('react-leaflet').Marker;
    var Popup = require('react-leaflet').Popup;
}
export default class SimpleExample extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <div>
                {process.env.BROWSER && (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
                )}
            </div>
        )
    }
}