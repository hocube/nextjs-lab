"use client";

// Components
import LabelCalendar from "../calendar/LabelCalendar";
import MDEditor from "@uiw/react-md-editor";

// Shadcn UI
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

// CSS
import styles from "./MarkdownDialog.module.scss";
import { useState } from "react";

function MarkdownDialog() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string | undefined>("**Hello, World!!**");
    const { toast } = useToast();

    // ==========================================================================================================

    // Supabase에 저장
    const onSubmit = () => {
        console.log("함수 호출");

        // 만약 title 값이나, content값이 없으면 toast UI로 error을 보여주도록.
        if(!title || !content){
            toast({
                title: "기입되지 않은 데이터가(값)가 있습니다.",
                description: "제목, 날짜 혹은 콘텐츠 값을 모두 작성해주세요.",
              });
              return;
        } else {
            // 값이 있으면 Supabase 데이터베이스에 연동
            
        }
    };

  return (
    <Dialog>
        <DialogTrigger asChild>
            <span className="font-normal text-gray-400 hover:text-gray-500 cursor-pointer">Add Contents</span>
        </DialogTrigger>
        <DialogContent className="max-w-fit">
            <DialogHeader>
                <DialogTitle>
                    <div className={styles.dialog__titleBox}>
                        <Checkbox className="w-5 h-5" />
                        <input type="text" placeholder="Write a title for your board"
                        className={styles.dialog__titleBox__title}
                        // 이벤트 발생 시 setTitle에 event.target.value에 값이 들어가도록.
                        // title에 입력 값이 바뀔 때마다 string 값이 들어감.
                        onChange={(event) => setTitle(event.target.value)}/>
                    </div>
                </DialogTitle>
                <div className={styles.dialog__calendarBox}>
                    <LabelCalendar label="From"/>
                    <LabelCalendar label="To"/>
                </div>
                <Separator />
                <div className={styles.dialog__markdown}>
                    <MDEditor value={content} height={100 + "%"} onChange={setContent}/>
                </div>
            </DialogHeader>
            <DialogFooter>
                <div className={styles.dialog__buttonBox}>
                    <DialogClose asChild>
                        <Button variant={"ghost"} className="font-normal text-gray-400 hover:bg-gray-50 hover:text-gray-500">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type={"submit"} className="font-normal border-orange-500 bg-orange-400 text-white hover:bg-orange-400 hover:text-white"
                    onClick={onSubmit}>
                        Done
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>

  )
}

export default MarkdownDialog