import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityPage() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/assets/project.loader.js",
    dataUrl: "/assets/project.data.gz",
    frameworkUrl: "/assets/project.framework.js.gz",
    codeUrl: "/assets/project.wasm.gz",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white w-full">
      <h1 className="text-3xl font-bold mb-6">Unity WebGL Game</h1>
      
      {!isLoaded && (
        <div className="absolute flex flex-col items-center justify-center z-10 bg-gray-900/80 w-[800px] h-[600px]">
          <p className="mb-2">Loading Application... {Math.round(loadingProgression * 100)}%</p>
          <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${loadingProgression * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl relative" style={{ width: 800, height: 600 }}>
        <Unity 
          unityProvider={unityProvider} 
          style={{ width: "100%", height: "100%" }} 
        />
      </div>
    </div>
  );
}
