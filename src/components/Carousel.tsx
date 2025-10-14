import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface CarouselProps {
  children: React.ReactNode[];
  visible: number; // itens por página no desktop (ex.: 3)
}

export const Carousel: React.FC<CarouselProps> = ({ children, visible: visibleDesktop }) => {
  const total = children.length;

  // Responsivo (evita cálculo no render/hidratação)
  const [isMobile, setIsMobile] = React.useState(false);
  const [visible, setVisible] = React.useState(visibleDesktop);
  React.useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisible(mobile ? 1 : visibleDesktop);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [visibleDesktop]);

  // Estado de navegação
  const [page, setPage] = React.useState(0);          // página atual (desktop)
  const [start, setStart] = React.useState(0);        // índice atual (mobile)
  const [direction, setDirection] = React.useState(0); // -1 prev / +1 next

  // Páginas (desktop)
  const pageCount = Math.max(1, Math.ceil(total / visible));

  const goToPage = (p: number) => {
    const wrapped = ((p % pageCount) + pageCount) % pageCount;
    setPage(wrapped);
  };
  const paginatePage = (dir: number) => {
    setDirection(dir);
    goToPage(page + dir);
  };

  // Mobile (1 por vez)
  const goToIndex = (idx: number) => {
    const wrapped = ((idx % total) + total) % total;
    setStart(wrapped);
  };
  const paginateIndex = (dir: number) => {
    setDirection(dir);
    goToIndex(start + dir);
  };

  // Fatia de itens da página (desktop)
  const getPageSlice = (p: number) => {
    const slice: number[] = [];
    const begin = p * visible;
    for (let i = 0; i < visible; i++) slice.push((begin + i) % total);
    return slice;
  };

  // Animação direcional
  const variants = {
    enter: (dir: number) => ({ x: dir >= 0 ? 40 : -40, opacity: 0.001, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir >= 0 ? -40 : 40, opacity: 0.001, scale: 0.98 }),
  } as const;

  const SWIPE_CONFIDENCE = 4500;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  // Máscara suave nas bordas (edge-fade)
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 6%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,.6) 94%, rgba(0,0,0,0) 100%)",
    maskImage:
      "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 6%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,.6) 94%, rgba(0,0,0,0) 100%)",
  };

  // (Opcional) altura mínima do viewport p/ evitar “pulo” dos dots
  const viewportMinH = "min-h-[360px] md:min-h-[340px]";

  return (
    <div className="relative w-full">
      {/* Setas desktop */}
      <button
        className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 p-2 shadow hover:bg-white"
        onClick={() => (isMobile ? paginateIndex(-1) : paginatePage(-1))}
        aria-label="Anterior"
        type="button"
      >
        <FiChevronLeft size={26} className="text-[#175fae]" />
      </button>
      <button
        className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 p-2 shadow hover:bg-white"
        onClick={() => (isMobile ? paginateIndex(1) : paginatePage(1))}
        aria-label="Próximo"
        type="button"
      >
        <FiChevronRight size={26} className="text-[#175fae]" />
      </button>

      {/* Viewport */}
      <div className="relative w-full py-4 px-4 md:px-[88px] overflow-hidden" style={maskStyle}>
        {/* MOBILE: 1 por vez com swipe */}
        {isMobile ? (
          <div className={viewportMinH}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={start}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 420, damping: 40 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  const power = swipePower(info.offset.x, info.velocity.x);
                  if (power < -SWIPE_CONFIDENCE) paginateIndex(1);
                  else if (power > SWIPE_CONFIDENCE) paginateIndex(-1);
                }}
                className="w-full"
              >
                <div className="w-full">{children[start]}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          // DESKTOP: página com N itens, também com swipe
          <div className={viewportMinH}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 420, damping: 40 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  const power = swipePower(info.offset.x, info.velocity.x);
                  if (power < -SWIPE_CONFIDENCE) paginatePage(1);
                  else if (power > SWIPE_CONFIDENCE) paginatePage(-1);
                }}
                className="flex gap-6"
              >
                {getPageSlice(page).map((idx) => (
                  <div
                    key={idx}
                    className="shrink-0"
                    style={{
                      width: `calc((100% - ${(visible - 1) * 1.5}rem) / ${visible})`,
                    }}
                  >
                    {children[idx]}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Dots: por página no desktop; por item no mobile */}
      <div className="mt-5 flex justify-center gap-2">
        {(isMobile ? total : pageCount) > 1 &&
          Array.from({ length: isMobile ? total : pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection((isMobile ? i - start : i - page) > 0 ? 1 : -1);
              }}
              aria-label={`Ir para ${isMobile ? "card" : "página"} ${i + 1}`}
              type="button"
              className={`h-2.5 rounded-full transition-all ${
                (isMobile ? i === start : i === page)
                  ? "w-6 bg-blue-400"
                  : "w-2.5 bg-blue-300/70 hover:bg-blue-400/80"
              }`}
            />
          ))}
      </div>
    </div>
  );
};