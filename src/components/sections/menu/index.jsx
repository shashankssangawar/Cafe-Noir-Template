import Button from "@/components/ui/button";
import Caption from "@/components/ui/caption";
import Title from "@/components/ui/title";
import { ArrowRight } from "lucide-react";
import MenuCatalogue from "./catalogue-cards";

export default function MenuSection() {
  return (
    <section
      id="menu"
      className="relative p-6 space-y-4"
    >
      <div className="w-full flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
        <div className="space-y-4">
          <Caption text={'Our Menu'} />
          <Title text={'A Taste for Everyone'} className={'w-full'} />
        </div>

        <div className="pb-4 md:flex hidden">
          <Button
            className={`
            w-full group bg-transparent! text-cafe-noir! hover:text-old-lace! border border-cafe-noir
            hover:bg-coffee! 
          `}
          >
            View Full Menu
            <span className="p-2 bg-coffee rounded-full group-hover:bg-old-lace">
              <ArrowRight
                className="shrink-0 size-4 text-old-lace group-hover:text-coffee"
              />
            </span>
          </Button>
        </div>
      </div>

      <MenuCatalogue />

      <div className="pb-4 flex md:hidden w-full">
        <Button
          className={`
            w-full group bg-transparent! text-cafe-noir! hover:text-old-lace! border border-cafe-noir
            hover:bg-coffee! 
          `}
        >
          View Full Menu
          <span className="p-2 bg-coffee rounded-full group-hover:bg-old-lace">
            <ArrowRight
              className="shrink-0 size-4 text-old-lace group-hover:text-coffee"
            />
          </span>
        </Button>
      </div>
    </section>
  )
}
