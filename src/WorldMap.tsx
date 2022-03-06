import React, { useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { usePopper } from "react-popper";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = () => {
  // Display the world map
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ComposableMap
        projectionConfig={{
          scale: 90,
          // rotation: [-11, 0, 0]
        }}
        style={{
          width: "80%",
          height: "100%",
          borderRadius: "8px",
          boxShadow:
            "0px 0px 0px 1px rgba(0,0,0,0.1), 0px 2px 2px rgba(0,0,0,0.1)",
        }}
        projection="geoMercator"
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geography) => {
                console.log("geography", geography);
                return (
                  <>
                    <Geography
                      key={geography.rsmKey}
                      geography={geography}
                      // projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                    <Marker
                      key={`${geography.rsmKey}-marker`}
                      coordinates={[
                        geography.centroid[0],
                        geography.centroid[1],
                      ]}
                      fill="#777"
                    >
                      <text textAnchor="middle" fill="#F53">
                        Mexico
                      </text>
                    </Marker>
                    {/* // Marker with a Heart icon and text saying
                    // #StandWithUkraine */}
                    {/* <Marker
                      coordinates={[
                        geography.centroid[0],
                        geography.centroid[1],
                      ]}
                    >
                      <text textAnchor="middle" fill="#F53">
                        Canada
                      </text>
                    </Marker> */}
                  </>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
        <Marker coordinates={[-103, 25]} fill="#777">
          <text textAnchor="middle" fill="#F53">
            Mexico
          </text>
        </Marker>
      </ComposableMap>
      {/* <div
          ref={setReferenceElement}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '10px',
            background: '#fff',
            borderRadius: '4px',
            boxShadow:
              '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 2px 2px rgba(0,0,0,0.1)',
            zIndex: 1
          }
                  </Marker>
                  </>
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap> */}
      {/* <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div ref={setArrowElement} style={styles.arrow} />
      </div> */}
    </div>
  );
};

export default WorldMap;
