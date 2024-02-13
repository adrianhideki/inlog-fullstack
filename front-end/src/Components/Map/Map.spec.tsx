import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Marker, Map, initialize, mockInstances } from "@googlemaps/jest-mocks";
import GoogleMap from ".";
import GoogleMarker from "./Marker";

beforeEach(async () => {
  await initialize();
});

describe("Map", () => {
  it("renders", async () => {
    await act(async () => {
      await render(
        <GoogleMap center={{ lat: 0, lng: 0 }}>
          <GoogleMarker />
          <GoogleMarker />
        </GoogleMap>
      );
    });

    const mapMocks = mockInstances.get(Map);
    const markerMocks = mockInstances.get(Marker);

    expect(screen.getByTestId("gmap-maker")).toBeInTheDocument();
    expect(mapMocks).toHaveLength(1);
    expect(markerMocks).toHaveLength(2);
  });
});
