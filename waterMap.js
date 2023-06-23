function waterMap(element) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVvbjgiLCJhIjoiY2xoMWNmZG44MTF6NzNxcnQ0aWZiZGd0MCJ9.Xs6eYwgvqxx7hOh00S5WfA";
  const mapp = new mapboxgl.Map({
    container: "mapp", // container ID
    // style: "mapbox://styles/mapbox/light-v11", // style URL
    style: "mapbox://styles/yeon8/cliohy76e006j01pwd1fqhuu6", // style URL
    center: [126.953527, 37.480439],
    zoom: 15.42,
    pitch: 42,
    bearing: 11.5,
  });

  // mapp.on("resize", function () {
  //   console.log("A resize event occurred.");
  // });

  // mapp.resize();
  // var mapDiv = document.getElementById("mapp");
  // if (mapDiv.style.visibility === true) mapp.resize();

  // var mapCanvas = document.getElementsByClassName("mapboxgl-canvas")[1];
  // console.log(mapCanvas);
  // mapCanvas.style.width = "100vw";
  // mapCanvas.style.height = "100vh";
  // mapCanvas.width = "100vw";
  // mapCanvas.height = "100vh";
  // mapCanvas.style.width = mapCanvas1.style.width;
  // mapCanvas.style.height = mapCanvas1.style.height;
  // mapCanvas.width = mapCanvas1.width;
  // mapCanvas.height = mapCanvas1.height;

  mapp.addControl(new mapboxgl.NavigationControl());

  mapp.on("load", function () {
    mapp.resize();
    mapp.addSource("seoul-6a11ya", {
      type: "vector",
      url: "mapbox://yeon8.4jffyadw",
    });
    //전체반지하
    mapp.addSource("banjiha-8nnvbu", {
      type: "vector",
      url: "mapbox://yeon8.bu4hkiit",
    });
    //high - medium - low
    mapp.addSource("final_score_low-5fm8hf", {
      type: "vector",
      url: "mapbox://yeon8.2wa4trja",
    });
    mapp.addSource("final_score_medium-51lioh", {
      type: "vector",
      url: "mapbox://yeon8.46y6lp49",
    });
    mapp.addSource("final_score_high_81qqn3", {
      type: "vector",
      url: "mapbox://yeon8.5u1le5no",
    });
    mapp.addLayer({
      id: "sky",
      type: "sky",
      paint: { "sky-atmosphere-color": "#eda6de" },
    });
    mapp.addLayer({
      id: "주의",
      type: "fill-extrusion",
      source: "final_score_low-5fm8hf",
      "source-layer": "final_score_low",
      paint: {
        "fill-extrusion-color": "#EDE0E0",
        "fill-extrusion-height": 0,
        "fill-extrusion-base": 15,
        "fill-extrusion-opacity": 0.6,
      },
    });
    mapp.addLayer({
      id: "위험",
      type: "fill-extrusion",
      source: "final_score_medium-51lioh",
      "source-layer": "final_score_medium",
      paint: {
        "fill-extrusion-color": "#EDE0E0",
        "fill-extrusion-height": 0,
        "fill-extrusion-base": 15,
        "fill-extrusion-opacity": 0.6,
      },
    });
    mapp.addLayer({
      id: "고위험",
      type: "fill-extrusion",
      source: "final_score_high_81qqn3",
      "source-layer": "final_score_high",
      paint: {
        "fill-extrusion-color": "#EDE0E0",
        "fill-extrusion-height": 0,
        "fill-extrusion-base": 15,
        "fill-extrusion-opacity": 0.6,
      },
    });

    mapp.addLayer({
      id: "주의-water",
      type: "fill-extrusion",
      source: "final_score_low-5fm8hf",
      "source-layer": "final_score_low",
      paint: {
        "fill-extrusion-color": "#8AF0FB",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          0,
          17.5,
          5,
        ],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.5,
          0,
          16,
          0.8,
        ],
      },
    });
    mapp.addLayer({
      id: "위험-water",
      type: "fill-extrusion",
      source: "final_score_medium-51lioh",
      "source-layer": "final_score_medium",
      paint: {
        "fill-extrusion-color": "#00C2E3",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          0,
          17.5,
          10,
        ],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.5,
          0,
          16,
          0.8,
        ],
      },
    });
    mapp.addLayer({
      id: "고위험-water",
      type: "fill-extrusion",
      source: "final_score_high_81qqn3",
      "source-layer": "final_score_high",
      paint: {
        "fill-extrusion-color": "#00869F",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          0,
          17.5,
          15,
        ],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.5,
          0,
          16,
          0.8,
        ],
      },
    });

    mapp.addLayer({
      id: "seoul",
      type: "fill-extrusion",
      source: "seoul-6a11ya",
      "source-layer": "seoul-6a11ya",
      paint: {
        "fill-extrusion-color": "#99f5ff",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          16,
          0,
          19,
          30,
        ],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.5,
          0,
          16,
          0.4,
        ],
      },
    });
  });
}
