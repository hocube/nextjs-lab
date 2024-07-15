"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase"; 

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

function MarkdownDialog() {
    // 반응성을 가진 데이터. open 상태를 업데이트하는 용도.
    // 다이얼로그가 열려 있는지 여부를 나타냄.
    const [open, setOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string | undefined>("**Hello, World!!**");
    const { toast } = useToast();

    // ==========================================================================================================

    // Supabase에 저장
    const onSubmit = async() => {
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
            const { data, error, status } = await supabase
                .from('todos')
                .insert([{ title: title, content: content }])
                .select()
            
        if (error) {
            console.log(error);
            toast({
                title: "에러가 발생했습니다.",
                description: "콘솔 창에 출력된 에러를 확인하세요.",
            })
        }
        /* 저장이 잘 되면 201이 전달되기 때문에 */
        if (status === 201){
            toast({
                title: "생성 완료!",
                description: "작성한 글이 Supabase에 올바르게 저장되었습니다.",
            });

            // 등록 후 조건 초기화
            setOpen(false);
        }
        }
    };

  return (
    // onOpenChange : Dialog 컴포넌트에서 제공하는 함수를 사용
    // 사용자가 "Add Contents" 버튼을 클릭하여 다이얼로그를 열면 
    // onOpenChange가 호출되어 open 상태를 true로 업데이트
    <Dialog open={open} onOpenChange={setOpen}> 
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