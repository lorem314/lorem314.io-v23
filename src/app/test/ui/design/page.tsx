export default function Page() {
  const regexLight = {
    title: "Regex Light",
    color: "black",
    primary: "#2c5c97",
    bg0: "#e5e5e5",
    bg1: "#f7f7f7",
    contentBg: "#fdfdfd",
  }
  const regexDark = {
    title: "Regex Dark",
    color: "white",
    primary: "#1a2c42",
    bg0: "#191919",
    bg1: "#1e1e1e",
    contentBg: "#232323",
  }
  const tailwindLight = {
    title: "Tailwind Light",
    color: "black",
    primary: "#2563eb",
    bg0: "#e5e7eb",
    bg1: "#f3f4f6", // #f9fafb
    contentBg: "#fafafa",
  }
  const tailwindDark = {
    title: "Tailwind Dark",
    color: "white",
    primary: "#1e3a8a",
    bg0: "#171717",
    bg1: "#1c1c1c",
    contentBg: "#262626",
  }
  return (
    <div className="container mx-auto my-8 rounded bg-white p-2.5 shadow">
      <div className="flex">
        {/* light */}
        <Drawer {...regexLight} />
        <Drawer {...regexDark} />
        <Drawer {...tailwindLight} />
        <Drawer {...tailwindDark} />
        {/* dark */}
      </div>
    </div>
  )
}

const Drawer = ({
  title = "",
  primary = "",
  bg0 = "",
  bg1 = "",
  contentBg = "",
  color = "",
}) => {
  return (
    <aside
      className="flex h-[75vh] w-[320px] flex-col"
      style={{ backgroundColor: bg1, color }}
    >
      <header
        className="flex h-[50px] items-center px-2.5"
        style={{
          backgroundColor: primary,
          color: "white",
        }}
      >
        <h1 className="text-lg">{title}</h1>
      </header>
      <nav className="flex grow">
        <div
          className="basis-[50px] bg-zinc-950"
          style={{ backgroundColor: bg0 }}
        >
          rs
        </div>
        <div
          className="mx-2.5 mt-2.5 grow rounded p-2.5 shadow"
          style={{ backgroundColor: contentBg }}
        >
          ctnt
        </div>
      </nav>
      <footer className="p-2.5">
        <p
          className="rounded p-2.5 shadow"
          style={{ backgroundColor: contentBg }}
        >
          footer
        </p>
      </footer>
    </aside>
  )
}
