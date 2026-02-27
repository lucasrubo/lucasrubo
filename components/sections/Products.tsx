import {
  BarChart3,
  PlayCircle,
  Flag,
  FlaskConical,
  MessageSquare,
  Database,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";

const ICON_MAP = {
  BarChart3,
  PlayCircle,
  Flag,
  FlaskConical,
  MessageSquare,
  Database,
};

export default function Products() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 bg-white border-t border-gray-100" id="products">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ph-dark mb-4">
            Everything you need, in one platform
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Stop stitching together a dozen different tools. AprixOS gives you
            all the insights you need to build a better product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => {
            const Icon = ICON_MAP[product.icon as keyof typeof ICON_MAP];
            return (
              <Link
                key={product.name}
                href={product.href}
                className="group relative p-6 bg-white border border-gray-200 rounded-xl hover:border-ph-orange/40 hover:shadow-lg transition-all duration-200"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${product.color}18` }}
                >
                  <Icon size={22} style={{ color: product.color }} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-ph-dark text-base mb-2 group-hover:text-ph-orange transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Learn more */}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ph-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
