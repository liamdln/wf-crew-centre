"use client";

import React, {createContext, useEffect, useState} from "react";
import {Sector} from "@prisma/client";
import {toast} from "@/hooks/use-toast";

type Props = {
    children: React.ReactNode;
}

type ContextType = {
    sectors: Sector[];
    sectorsBusy: boolean;
    getSectors: () => Promise<Sector[]>;
    addSector: (sector: Sector) => Promise<void>;
    updateSector: (id: number, sector: Sector) => Promise<void>;
    deleteSector: (sectorId: number) => Promise<void>;
    reorderSectors: () => void;
}

const initialContext: ContextType = {
    sectors: [],
    sectorsBusy: true,
    getSectors: () => Promise.resolve([]),
    addSector: () => Promise.resolve(),
    updateSector: () => Promise.resolve(),
    deleteSector: () => Promise.resolve(),
    reorderSectors: () => null,
}

const SectorContext = createContext(initialContext)

function SectorProvider({children}: Props) {

    const [sectors, setSectors] = useState<Sector[]>(initialContext.sectors)
    const [sectorsBusy, setSectorsBusy] = useState(initialContext.sectorsBusy)

    useEffect(() => {
        getSectors()
            .then(sectors => setSectors(sectors))
            .catch(err => {
                console.error(err);
                toast({
                    title: "An Error Occurred",
                    description: "Could not fetch sectors.",
                    variant: "destructive"
                });
                setSectors([])
            })
    }, []);

    const getSectors = async () => {
        setSectorsBusy(true)
        return await fetch("/api/sectors", {cache: "no-store"})
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => data)
            .finally(() => setSectorsBusy(false))
    }

    const addSector = async (sector: Sector) => {
        setSectorsBusy(true)
        await fetch("/api/sectors", {
            method: "POST",
            body: JSON.stringify(sector),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => {
                setSectors(old => [...old, sector])
                return data;
            })
            .finally(() => setSectorsBusy(false))
    }

    const deleteSector = async (sectorId: number) => {
        setSectorsBusy(true)
        await fetch(`/api/sectors?id=${sectorId}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText)
                const sectorIndex = sectors.map(sector => sector.id).indexOf(sectorId)
                setSectors(old => {
                    const lhs = old.slice(0, sectorIndex)
                    const rhs = old.slice(sectorIndex + 1, old.length)
                    return lhs.concat(rhs)
                })
            })
            .finally(() => setSectorsBusy(false))
    }

    const reorderSectors = () => {
        setSectorsBusy(true)
        setSectors(old => old.toSorted((a, b) => a.id - b.id))
        setSectorsBusy(false)
    }

    const updateSector = async (id: number, sector: Sector) => {
        setSectorsBusy(true)
        await fetch(`/api/sectors?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(sector),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(data => {
                const sectorIndex = sectors.map(sector => sector.id).indexOf(
                    sector.id === id ? sector.id : id
                )
                setSectors(old => {
                    old[sectorIndex] = sector
                    return old
                })
                return data
            })
            .finally(() => setSectorsBusy(false))
    }

    return (
        <SectorContext.Provider value={{
            sectors: sectors,
            sectorsBusy: sectorsBusy,
            getSectors: getSectors,
            addSector: addSector,
            updateSector: updateSector,
            deleteSector: deleteSector,
            reorderSectors
        }}>
            {children}
        </SectorContext.Provider>
    )

}

export {SectorProvider, SectorContext}