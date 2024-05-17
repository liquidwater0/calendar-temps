import { useEffect, useRef } from "react";

export default function useFirstRenderEffect(callback: () => void, dependencies: any[]) {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        
        callback();
    }, dependencies);
}