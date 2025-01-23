import React from "react"
import PropTypes from "prop-types"
import { Copy, MoreVertical, Trash } from "lucide-react"

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

export function UserTable({ profiles, onDelete, onCopy }) {
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
        {profiles.map((profile) => (
          <TableRow
            key={profile.Subdomain}
            className="border-b border-border hover:bg-muted/50"
          >
            <TableCell className="font-medium text-primary">
              {profile.Subdomain}
            </TableCell>
            <TableCell className="font-mono text-muted-foreground">
              {profile.TransactionId}
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
                  <DropdownMenuItem onClick={() => onCopy(profile.Subdomain)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(profile.Subdomain)}
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

UserTable.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      subdomain: PropTypes.string.isRequired,
      templateTxId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
}
