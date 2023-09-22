"use client"

//icons
import { MdAlternateEmail, MdOutlineCalendarMonth } from "react-icons/md";

// Global imports
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";


// Local imports
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
//types
import { getFirstLettersOfWords } from "@/libs/getFirstLettersOfWords";
// Components
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";





// We need to specify Coloumns name and also specify how rows renders
export const columns: ColumnDef<SafeUser>[] = [
    // checkbox
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // avatar images
    {
        accessorKey: "image",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Avatar" />
        ),
        cell: ({ row }) => <span className="max-w-12"><Avatar className="h-8 w-8">
            <AvatarImage src={row.getValue("image") || '/avatars/01.png'} alt="@shadcn" />
            <AvatarFallback>{getFirstLettersOfWords(row.getValue("name"))}</AvatarFallback>
        </Avatar></span>,
        enableSorting: false,
        enableHiding: false,
    },


    // names
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
            return (
                <span className="max-w-[80px] truncate font-medium">
                    {row.getValue("name")}
                </span>
            )
        },
    },


   //Game Mode
    {
        accessorKey: "gameMode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GameMode" />
        ),
        cell: ({ row }) => {
            return (
                <span className="max-w-[80px] truncate font-medium">
                    {row.getValue("gameMode")}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // Moves Takem
    {
        accessorKey: "movestaken",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Moves Taken" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex  w-[250px] items-center">
                    <MdOutlineCalendarMonth className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{row.getValue("movestaken")}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // Time Taken
    {
        accessorKey: "timetaken",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TimeTaken" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex  w-[250px] items-center">
                    <MdOutlineCalendarMonth className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{row.getValue("timetaken")}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // actions
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]