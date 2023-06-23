function levelMap(element) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVvbjgiLCJhIjoiY2xoMWNmZG44MTF6NzNxcnQ0aWZiZGd0MCJ9.Xs6eYwgvqxx7hOh00S5WfA";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    // style: "mapbox://styles/mapbox/light-v11", // style URL
    style: "mapbox://styles/yeon8/cliohy76e006j01pwd1fqhuu6", // style URL
    center: [126.953527, 37.480439],
    zoom: 15.42,
    pitch: 42,
    bearing: 11.5,
  });

  // var mapCanvas = document.getElementsByClassName("mapboxgl-canvas")[0];
  // console.log(mapCanvas);
  // mapCanvas.style.width = "100vw";
  // mapCanvas.style.height = "100vh";

  map.on("load", function () {
    map.addSource("seoul-4f83ed", {
      type: "vector",
      url: "mapbox://coco-ball.98kzo2nk",
    });
    //전체반지하
    map.addSource("banjiha-8nnvbu", {
      type: "vector",
      url: "mapbox://yeon8.bu4hkiit",
    });
    //high - medium - low
    map.addSource("final_score_low-5fm8hf", {
      type: "vector",
      url: "mapbox://yeon8.2wa4trja",
    });
    map.addSource("final_score_medium-51lioh", {
      type: "vector",
      url: "mapbox://yeon8.46y6lp49",
    });
    map.addSource("final_score_high_81qqn3", {
      type: "vector",
      url: "mapbox://yeon8.5u1le5no",
    });
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: { "sky-atmosphere-color": "#eda6de" },
    });
    map.addLayer({
      id: "주의",
      type: "fill-extrusion",
      source: "final_score_low-5fm8hf",
      "source-layer": "final_score_low",
      paint: {
        "fill-extrusion-color": "#fdb4b8",
        "fill-extrusion-height": 15,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.9,
      },
    });
    map.addLayer({
      id: "위험",
      type: "fill-extrusion",
      source: "final_score_medium-51lioh",
      "source-layer": "final_score_medium",
      paint: {
        "fill-extrusion-color": "#fd7785",
        "fill-extrusion-height": 15,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.9,
      },
    });
    map.addLayer({
      id: "고위험",
      type: "fill-extrusion",
      source: "final_score_high_81qqn3",
      "source-layer": "final_score_high",
      paint: {
        "fill-extrusion-color": "#9f0f24",
        "fill-extrusion-height": 15,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.9,
      },
    });
  });

  // After the last frame rendered before the map enters an "idle" state.
  map.on("idle", () => {
    // If these two layers were not added to the map, abort
    if (
      !map.getLayer("주의") ||
      !map.getLayer("위험") ||
      !map.getLayer("고위험")
    ) {
      return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ["주의", "위험", "고위험"];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
      // Skip layers that already have a button set up.
      if (document.getElementById(id)) {
        console.log(document.getElementById(id));
        continue;
      }

      // Create a link.
      const link = document.createElement("a");
      link.id = id;
      link.href = "#";
      link.textContent = id;
      link.className = "active";

      // Show or hide layer when the toggle is clicked.
      link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        const visibility = map.getLayoutProperty(clickedLayer, "visibility");

        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === "visible") {
          map.setLayoutProperty(clickedLayer, "visibility", "none");
          this.className = "";
        } else {
          this.className = "active";
          map.setLayoutProperty(clickedLayer, "visibility", "visible");
        }
      };

      const layers = document.getElementById("menu");
      layers.appendChild(link);
    }
  });
}
