"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"; // npm i react-intersection-observer
import Image from "next/image";
import { getCommentsAction, postCommentAction } from "../../services/comment.service";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { toast } from "react-toastify";

const commentSchema = z.object({
  comment: z.string().nonempty("Full name must be at least 2 characters")
})
export function VideoComments({ videoId }: { videoId: string }) {
  const { ref, inView } = useInView();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: ""
    },
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ["comments", videoId],
    queryFn: ({ pageParam }) => getCommentsAction({ videoId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasNextPage && lastPage.nextPage != undefined ? lastPage.nextPage : undefined,
  });

  // Automatically fetch next page when the "load more" div enters the viewport
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (status === "pending" && !data) return <p>Loading comments...</p>;
  if (status === "error" || error) return <p>Error loading comments</p>;

  const onSubmit = async (data: {
    comment: string;
  }) => {
    await toast.promise(async () => await postCommentAction(videoId, data.comment), {
      pending: "Adding Comment...",
      success: {
        render() {
          refetch();
          form.reset()
          return "Comment Added successfully..."
        }
      },
      error: {
        render({ data }) {
          return data && typeof data == "object" && "message" in data ? data?.message as string : "Not able to add Comment. Please try again.";
        },
      }
    })

  }
  return (
    <div className="space-y-6 pt-3 grow sm:overflow-y-auto no-scrollbar">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <Controller
              name="comment"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    className="border-0 !ring-0 !shadow-none border-b rounded-none"
                    aria-invalid={fieldState.invalid}
                    placeholder="Add comment"
                    autoComplete="off"
                  />
                </Field>
              )}
            />
            <Button className="text-white bg-transparent">
              <SendHorizonal />
            </Button>
          </div>
        </form>
      </Form>
      <div className="space-y-4">
        {data.pages.map((page, i) => (
          <div key={i} className="space-y-4">
            {page.docs.map((comment) => (
              <div key={comment._id} className="flex flex-col">
                <div className="flex gap-3 p-2">
                  <Image
                    src={comment.commentor.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={comment.commentor.username}
                    height={600}
                    width={600}
                  />
                  <div>
                    <p className="text-sm font-semibold">@{comment.commentor.username}</p>
                    <p className="text-sm text-gray-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Invisible div to trigger infinite scroll */}
      <div ref={ref} className="h-10 flex justify-center items-center">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
        ) : hasNextPage ? (
          "Scroll for more"
        ) : (
          <p className="text-sm text-muted-foreground">No more comments.</p>
        )}
      </div>
    </div>
  );
}