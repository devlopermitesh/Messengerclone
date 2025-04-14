import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SelectLanguage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">Select a Language</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>English
     
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Spanish</DropdownMenuItem>
          <DropdownMenuItem>French</DropdownMenuItem>
          <DropdownMenuItem>German</DropdownMenuItem>
          <DropdownMenuItem>Chinese</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
