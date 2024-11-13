import { FrownIcon } from "lucide-react";

interface INotFound {
  title?: string;
  subTitle?: string;
}
export const NotFound = ({ title, subTitle }: INotFound) => {
  return (
    <div className="flex flex-col items-center justify-center  text-center p-4">
      <FrownIcon className="w-20 h-20  mb-4" />
      <h2 className="text-2xl font-bold  mb-2">
        {title ?? "Oops! Nada encontrado por aqui."}
      </h2>
      <p className="text-muted-foreground">
        {subTitle ??
          "Parece que estamos em silêncio. Que tal tentar uma nova busca?"}
      </p>
    </div>
  );
};
