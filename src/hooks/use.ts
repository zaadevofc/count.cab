import { useMutation, useQuery } from "@tanstack/react-query";
import ms from 'ms';
import { fetchAnalytics, fetchKounterAdd, fetchKounterDel, fetchKounterList, fetchKounterPut, fetchKounterReset, fetchVisits } from "./fetch";

export const useKounterList = (email: string) => useQuery({
    queryFn: fetchKounterList,
    queryKey: ['fetchKounterList', email],
    refetchOnReconnect: true,
    refetchInterval: ms('3m')
});

export const useAnalytics = (email: string) => useQuery({
    queryFn: fetchAnalytics,
    queryKey: ['fetchAnalytics', email],
    refetchOnReconnect: true,
    refetchInterval: ms('3m')
});

export const useKounterPut = () => useMutation({
    mutationFn: fetchKounterPut,
    mutationKey: ['fetchKounterPut']
});

export const useKounterReset = () => useMutation({
    mutationFn: fetchKounterReset,
    mutationKey: ['fetchKounterReset']
});

export const useKounterAdd = () => useMutation({
    mutationFn: fetchKounterAdd,
    mutationKey: ['fetchKounterAdd']
});

export const useKounterDel = () => useMutation({
    mutationFn: fetchKounterDel,
    mutationKey: ['fetchKounterDel']
});

export const usePushVisits = () => useMutation({
    mutationFn: fetchVisits,
    mutationKey: ['fetchVisits']
});