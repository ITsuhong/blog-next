export default function Page() {
    return (
        <div>

            <button
                className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-tr from-primary to-cyan-400  active:scale-95"
            >
  <span
      className="w-full h-full flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-[14px] bg-gradient-to-tr from-primary to-cyan-400 "
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
    >
      <path
          d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z"
      ></path></svg
    >新建分类</span
  >
            </button>
        </div>
    )
}