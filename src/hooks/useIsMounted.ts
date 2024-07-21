import { useEffect, useRef, useCallback } from 'react';

/*This custom hook keeps track of whether a component is mounted or has unmounted. 
It returns a function that, when invoked, will return the value of the `isMounted` ref. 
This hook can be used to prevent the React warning if parts of code try to "set state" 
on an unmounted component.
 */
function useIsMounted(): () => boolean {
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return useCallback(() => isMountedRef.current, []);
}

export default useIsMounted;