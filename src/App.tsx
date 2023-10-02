import React, { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import NeshanMap, {
  NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers";
import { Overlay } from "ol";
import { fromLonLat } from "ol/proj";
import ToggleButton from "./assets/ToggleBtn";

function App() {
  const [userBtn, setUserBtn] = useState({ kids: false });
  const [showUserLocation, setShowUserLocation] = useState(false);
  const mapRef = useRef<NeshanMapRef | null>(null);
  const userLocationOverlayRef = useRef<Overlay>(
    new Overlay({ element: document.createElement("div") })
  );

  const onInit = (map: ol.Map) => {
    // ...

    // Create an overlay for the user's location
    const userLocationOverlay = new Overlay({
      element: document.createElement("div"),
      positioning: "center-center",
      stopEvent: false, // Allow map events to pass through the overlay
    });

    // Add the overlay to the map

    map.addOverlay(userLocationOverlayRef.current);
    userLocationOverlayRef.current = userLocationOverlay;
  };

  const showUserLocationOnMap = () => {
    const map = mapRef.current?.map;
    const userLocationOverlay = userLocationOverlayRef.current;

    if ("geolocation" in navigator) {
      // Request the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Create an HTML element for the user location marker
          const userLocationMarker = document.createElement("div");
          userLocationMarker.className = "user-location-marker"; // Apply the CSS class for styling
          userLocationOverlay.setElement(userLocationMarker);

          // Set the position of the overlay based on the user's location
          userLocationOverlay.setPosition(fromLonLat([longitude, latitude]));

          setUserBtn({ kids: false }); // Hide the "kids" content if shown
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType("neshan");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="!w-[600px] mx-auto relative">
        <NeshanMap
          mapKey="web.d5f057aa39af440c9d0c6dd99287022e"
          defaultType="neshan"
          center={{ latitude: 35.7665394, longitude: 51.4749824 }}
          style={{
            height: "100vh",
            width: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: "20",
          }}
          onInit={onInit}
          zoom={13}
          ref={mapRef}
        />

        <div className="absolute mx-auto bg-black rounded-[50%] h-[60px] left-5 bottom-40 z-50 w-[60px]">
          location
        </div>

        <div className="absolute mx-auto bg-black rounded-[50%] h-[60px] right-5 bottom-60 z-50 w-[60px]">
          <button
            id="userLocationButton"
            className="text-white"
            onClick={showUserLocationOnMap}
          >
            Show Location
          </button>
        </div>

        <div
          className="absolute mx-auto bg-black rounded-[50%] h-[60px] right-5 bottom-40 z-50 w-[60px]"
          onClick={() =>
            setUserBtn({
              kids: true,
            })
          }
        >
          kids
        </div>

        {userBtn.kids === true && (
          <div className="bg-orange-500 left-[50%] w-[350px] rounded-[10px] -translate-x-[50%] absolute z-50 top-[30%] mx-auto p-5 ">
            <div className="bg-black text-end text-white border border-red-600 w-[95%]">
              <p className="text-end p-1">
                كاربر گرامي؛ در تاكسي كودكان، رفاه و ايمني فرزند عزيز شما كاملا
                فراهم است. اين سرويس بصورت در اختيار بوده و هزينه آن با توجه به
                خدمات ارائه شده محاسبه مي گردد.
              </p>
            </div>
            <ToggleButton />
            <ToggleButton />
            <ToggleButton />
          </div>
        )}

        {!showUserLocation && (
          <div
            id="userLocationButton"
            className="absolute mx-auto bg-black rounded-[50%] h-[60px] right-5 bottom-40 z-50 w-[60px]"
          >
            Show Location
          </div>
        )}

        <div className="absolute mx-auto bg-black rounded-[50%] h-[60px] right-5 bottom-[20rem] z-50 w-[60px]">
          location
        </div>

        <div className="absolute mx-auto bg-red-600 rounded-[50%] h-[60px] right-5 bottom-[25rem] z-50 w-[60px]">
          location
        </div>

        <div className="absolute mx-auto bg-black rounded-[10px] -translate-x-[50%] left-[50%] bottom-[2rem] z-50 w-[350px] ">
          <div>
            <div className="w-full bg-blue-400 rounded-[10px] my-2 relative">
              <p className="text-white text-end pr-2">انتخاب مبدا</p>
              <div className="absolute bg-white px-4 rounded-[10px] top-0">
                OK
              </div>
            </div>

            <div className="w-full bg-orange-400 rounded-[10px] my-2 relative">
              <p className="text-white text-end pr-2">انتخاب مبدا</p>
              <div className="absolute bg-white px-4 rounded-[10px] top-0">
                OK
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
