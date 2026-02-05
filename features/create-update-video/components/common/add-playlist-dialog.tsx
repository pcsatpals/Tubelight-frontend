import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { addPlaylist } from "../../services/add-playlist"

export function AddPlaylistModel({ onSuccess }: { onSuccess: (id: string) => void }) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })
    const [error, setError] = useState({
        name: "",
        description: ""
    })
    const { mutate } = useMutation({
        mutationFn: async () => {
            const res = await addPlaylist(formData)
            onSuccess(res.data._id)
            setOpen(false)
        },

    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus />
                    Create New playlist
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-175">
                <DialogHeader>
                    <DialogTitle>Add a New Playlist</DialogTitle>
                    <DialogDescription>
                        Create a new Playlist
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter Playlist Name here"
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                                setError((prev) => ({ ...prev, name: "" }))
                            }}
                        />
                        {error.name && <FieldError>{error.name}</FieldError>}
                    </Field>
                    <Field>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Enter Playlist Description here"
                            className="min-h-30"
                            onChange={(e) => {
                                setFormData((prev) => ({ ...prev, description: e.target.value }))
                                setError((prev) => ({ ...prev, description: "" }))
                            }}
                        />
                        {error.description && <FieldError>{error.description}</FieldError>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={() => {
                        if (!formData.name) {
                            setError((prev) => ({ ...prev, name: "Playlist Name is required" }))
                        }
                        if (!formData.description) {
                            setError((prev) => ({ ...prev, description: "Playlist description is required" }))
                        }
                        if (formData.description && formData.name) {
                            mutate()
                        }
                    }}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
