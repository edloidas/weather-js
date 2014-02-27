/**
 * Weather.js
 * A simple weather widget.
 * @author edloidas
 */
function WeatherJS () {
    var self = this;

    this.widgets = {};

    // auto-update
    setInterval( function () {
        for ( var key in self.widgets ) {
            self.widgets[ key ].update();
        }
    }, 60 * 1000); // 60s
}

WeatherJS.prototype.Widget = function ( location ) {
    var self = this,
        xhr = new XMLHttpRequest();

    this.id = "weatherjs-" + Math.random().toString( 36 ).substr( 2 );
    this.location = location;
    this.data = {};
    this.dom = document.createElement('div');
    this.dom.classList.add("weatherjs");
    this.dom.id = this.id;

    this.render = function () {
        this.data = this.data;

        if ( this.data.cod === 200 ) {
            this.dom.innerHTML = "";

            var h2   = document.createElement('h2'),
                icon = document.createElement('div'),
                img  = document.createElement('img'),
                ul   = document.createElement('ul'),
                li   = document.createElement('li');

            h2.textContent = this.data.name;
            this.dom.appendChild( h2 );

            icon.classList.add("icon");
            img.alt   = this.data.weather[0].main || "unknown";
            img.title = this.data.weather[0].description || "unknown";
            img.src   = this.data.weather[0].icon ?
                        'http://openweathermap.org/img/w/' + this.data.weather[0].icon + ".png" :
                        "";
            icon.appendChild( img );
            this.dom.appendChild( icon );

            // temp
            li.innerHTML = "Temperature: " + ( Math.round(this.data.main.temp) || "0" ) + "°C";
            ul.appendChild( li );
            // status
            li = document.createElement('li');
            li.innerHTML = "Status: " + ( this.data.weather[0].main || "unknown" );
            ul.appendChild( li );
            // pressure
            li = document.createElement('li');
            li.innerHTML = "Pressure: " + ( this.data.main.pressure || "0" ) + " atm";
            ul.appendChild( li );
            // Humidity
            li = document.createElement('li');
            li.innerHTML = "Humidity: " + ( this.data.main.humidity || "0" ) + "%";
            ul.appendChild( li );
            // Wind
            li = document.createElement('li');
            li.innerHTML = "Wind: " + ( this.data.wind.speed || "0" ) + " m/s";
            ul.appendChild( li );
            // Clouds
            li = document.createElement('li');
            li.innerHTML = "Clouds: " + ( this.data.clouds.all || "0" ) + "%";
            ul.appendChild( li );

            this.dom.appendChild( ul );
        }
    };

    this.update = function () {
        xhr.abort(); // abort previous

        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric';
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onload = function( e ) {
            if ( xhr.status === 200 ) {
                self.data = JSON.parse( xhr.response ||
                                        '{"sys":{}, "weather":[{}], "main":{}, "wind":{}, "clouds":{}}' );
                self.render();
            }
        };
    };
};

/**
 * Method generates weather widget for the `location` city, as a dom element.
 */
WeatherJS.prototype.createWidget = function ( parentId, location ) {
    var parent = document.getElementById( parentId ),
        widget = null;

    if ( parent !== null ) {
        widget = new WeatherJS.prototype.Widget( location );
        widget.update();

        this.widgets[ widget.id ] = widget;

        parent.appendChild( widget.dom );
    }

    return widget;
};

/**
 * Method finds widget by the element id and than removes it.
 */
WeatherJS.prototype.deleteWidget = function ( widgetId ) {
    delete this.widgets[ widgetId ];

    var widget = document.getElementById( widgetId );
    if ( widget !== null && widget !== undefined ) {
        widget.remove();
        return true;
    }

    return false;
};

window.$weatherjs = new WeatherJS();
