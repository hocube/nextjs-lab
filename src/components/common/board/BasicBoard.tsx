// Shadcn Ui
import { Checkbox } from "@/components/ui/checkbox"

// CSS
import styles from "./BasicBoard.module.scss";
import { Button } from "@/components/ui/button";

// Lucide
import { ChevronUp } from "lucide-react";
import LabelCalendar from "../calendar/LabelCalendar";
import MarkdownDialog from "../dialog/MarkdownDialog";

function BasicBoard() {
  return (
    <div className={styles.container}>
        <div className={styles.container__header}>
            <div className={styles.container__header__titleBox}>
                <Checkbox className="w-5 h-5"/>
                <span className={styles.title}>Please enter a title for the board</span>
            </div>
            <Button variant={"ghost"}>
                <ChevronUp className="w5 h-5 text-gray-400"></ChevronUp>
            </Button>
        </div>
        <div className={styles.container__body}>
            <div className={styles.container__body__calendarBox}>
                <LabelCalendar label="From"/>
                <LabelCalendar label="To"/>
            </div>
            <div className={styles.container__body__buttonBox}>
                <Button variant={"ghost"} className="font-normal text-gray-400 hover:bg-green-50 hover:text-green-500">
                    Duplicate
                </Button>
                <Button variant={"ghost"} className="font-normal text-gray-400 hover:bg-red-50 hover:text-red-500">
                    Delete
                </Button>
            </div>
        </div>
        <div className={styles.container__footer}>
            <MarkdownDialog></MarkdownDialog>
        </div>
    </div>
  )
}

export default BasicBoard