"use client"
import React from "react";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };

export default function Loading() {
      let [loading, setLoading] = React.useState(true);
  let [color, setColor] = React.useState("#ffffff");
      // Or a custom loading skeleton component
      return (
            <div className="sweet-loading">
              <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
              <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />

              <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          );
    }
