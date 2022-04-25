import type { INavigator } from '@momo-kits/core';
import { useEffect, useRef } from 'react';
import type { NativeEventSubscription } from 'react-native';
import { BackHandler } from 'react-native';
import { useMemoizedCallback } from './useMemoizedCallback';

export const useBackPressCallback = (callback: () => boolean, navigator: INavigator) => {
    const backHandlerRef = useRef<NativeEventSubscription | undefined>();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const backAction = useMemoizedCallback(() => {
        if (navigator.navigation?.isFocused()) {
            return callback();
        }
        return false;
    }, [callback, navigator.navigation]);

    const applicationFocus = useMemoizedCallback(() => {
        backHandlerRef.current?.remove();
        backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', backAction);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            backHandlerRef.current?.remove();
            backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', backAction);
        }, 500);
        return () => {
            backHandlerRef.current?.remove();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [backAction]);

    useEffect(() => {
        applicationFocus();
        const unsubscribeFocus = navigator?.navigation?.addListener?.('focus', applicationFocus);
        return () => {
            unsubscribeFocus?.();
        };
    }, [applicationFocus, navigator?.navigation]);
};
