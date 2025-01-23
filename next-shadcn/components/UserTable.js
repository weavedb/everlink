import React from "react"
import { MoreVertical, Trash, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function UserTable({ records, onDelete, onEdit }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-border hover:bg-muted/50">
          <TableHead className="text-muted-foreground">SUBDOMAIN</TableHead>
          <TableHead className="text-muted-foreground">
            TEMPLATE TX ID
          </TableHead>
          <TableHead className="text-muted-foreground w-[100px]">
            ACTIONS
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow
            key={record.Subdomain}
            className="border-b border-border hover:bg-muted/50"
          >
            <TableCell className="font-medium text-primary">
              <a
                href={`https://${record.Subdomain}_everlink.ar.io`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {record.Subdomain}
              </a>
            </TableCell>
            <TableCell className="font-mono text-muted-foreground">
              <a
                href={`https://viewblock.io/arweave/tx/${record.TransactionId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {record.TransactionId}
              </a>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={async () => await onEdit(record.Subdomain)}
                  >
                    <SquarePen className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => await onDelete(record.Subdomain)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
