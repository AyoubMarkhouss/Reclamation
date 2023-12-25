import { api } from "@/utils/api";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  label: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
  type: z.string().optional(),
  impo: z.string().optional(),
  typeTwo: z.string().optional(),
  Commune: z.string().optional(),
  tgr: z.string().optional(),
  CDG: z.string().optional(),
  reclamation: z
    .string()
    .min(10, {
      message: "reclamation must be at least 10 characters.",
    })
    .max(500, {
      message: "reclamation must not be longer than 500 characters.",
    })
    .optional(),
  Banque: z.string().optional(),
  Assurance: z.string().optional(),
  Ancfcc: z.string().optional(),
});
const Rec = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { label: "", reclamation: "" },
  });
  const router = useRouter();
  const id = router.query.id as string;
  const { mutate } = api.client.giveNewReport.useMutation({
    onSuccess: () => {
      void toast.success("done");
      void router.push("/myReport");
    },
  });

  const optiontype = router.query.id as string;
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (router.query.id === "option02") {
      mutate({
        option: optiontype,
        reportDetails: data.reclamation ?? "",
        reportObjet: data.label ?? "",
        reportRadio: data.type ?? "",
        reportList:
          form.watch("type") === "IMPO"
            ? data.impo ?? ""
            : form.watch("type") === "Commune"
              ? data.Commune ?? ""
              : form.watch("type") === "TGR"
                ? data.tgr ?? ""
                : "",
      });
    }

    if (router.query.id === "option03") {
      mutate({
        option: optiontype,
        reportDetails: data.reclamation ?? "",
        reportObjet: data.label ?? "",
        reportRadio:
          form.watch("typeTwo") === "CDG"
            ? "CDG" ?? ""
            : form.watch("typeTwo") === "Banques"
              ? "Banque" ?? ""
              : form.watch("typeTwo") === "Assurances"
                ? "Assurance" ?? ""
                : "",
        reportList:
          `${form.watch("typeTwo")}` === "CDG"
            ? null
            : `${
                form.watch("typeTwo") === "Assurances"
                  ? data.Assurance
                  : form.watch("typeTwo") === "Banques"
                    ? data.Banque
                    : ""
              }`,
      });
    }

    if (router.query.id === "option04") {
      mutate({
        option: optiontype,
        reportDetails: data.reclamation ?? "",
        reportObjet: data.label ?? "",
        reportRadio: "Ancfcc / C.F",
        reportList:
          `${data.Ancfcc}` === "Ancfcc / C.f" ? null : `${data.Ancfcc}`,
      });
    }

    if (router.query.id === "option01") {
      mutate({
        option: optiontype,
        reportDetails: data.reclamation ?? "",
        reportObjet: data.label ?? "",
        reportRadio: "Établissement public",
        reportList: null,
      });
    }
    console.log(form.watch("typeTwo"));
  }
  const pathname = router.asPath;
  const BanqueList = [
    { label: "Attijariwafa Bank", value: "Attijariwafa Bank" },
    { label: "Banque Centrale Populaire", value: "Banque Centrale Populaire" },
    { label: "BMCE Bank of Africa", value: "BMCE Bank of Africa" },
    { label: "BMCI", value: "BMCI" },
    { label: "CIH Bank", value: "CIH Bank" },
    { label: "Crédit Agricole du Maroc", value: "Crédit Agricole du Maroc" },
    { label: "Société Générale Maroc", value: "Société Générale Maroc" },
    { label: "AL BARID BANK", value: "AL BARID BANK" },
    { label: "AL AKHDAR BANK", value: "AL AKHDAR BANK" },
    { label: "BTI BANK", value: "BTI BANK" },
    { label: "ARAB BANK", value: "ARAB BANK" },
    { label: "BANK AL YOUSR", value: "BANK AL YOUSR" },
    { label: "BANK OF AFRICA", value: "BANK OF AFRICA" },
    { label: "CDG CAPITAL", value: "CDG CAPITAL" },
    { label: "CFG BANK", value: "CFG BANK" },
    { label: "CITIBANK MAGHREB", value: "CITIBANK MAGHREB" },
    { label: "CREDIT AGRICOLE DU MAROC", value: "CREDIT AGRICOLE DU MAROC" },
    { label: "CREDIT DU MAROC", value: "CREDIT DU MAROC" },
    { label: "DAR EL AMANE", value: "DAR EL AMANE" },
    { label: "SOCIÉTÉ GÉNÉRALE MAROC", value: "SOCIÉTÉ GÉNÉRALE MAROC" },
    { label: "UMNIA BANK", value: "UMNIA BANK" },
    { label: "Autre", value: "Autre" },
  ] as const;
  const cdg = [
    { label: "CNSS", value: "CNSS" },
    { label: "Prevas", value: "Prevas" },
    { label: "Autre", value: "Autre" },
  ] as const;

  const impoList = [
    {
      label: "DIRECTION INTER PRÉFECTORAL DES PERSONNES MORALES-CASABLANCA",
      value: "DIRECTION INTER PRÉFECTORAL DES PERSONNES MORALES-CASABLANCA",
    },
    {
      label:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES PHYSIQUES AIN CHOK HAY HASSANI-CASABLANCA",
      value:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES PHYSIQUES AIN CHOK HAY HASSANI-CASABLANCA",
    },
    {
      label:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES  PHYSIQUES  AL FIDA - MAARIF EST-CASABLANCA",
      value:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES  PHYSIQUES  AL FIDA - MAARIF EST-CASABLANCA",
    },
    {
      label:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES PHYSIQUES BEN MSIK SIDI OTHMANE-CASABLANCA",
      value:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES PHYSIQUES BEN MSIK SIDI OTHMANE-CASABLANCA",
    },
    {
      label:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES PHYSIQUES  HAY MOHAMMADI AIN SBAA SIDI BERNOUSSI-CASABLANCA",
      value:
        "DIRECTION INTER PRÉFECTORAL DES PERSONNES PHYSIQUES  HAY MOHAMMADI AIN SBAA SIDI BERNOUSSI-CASABLANCA",
    },
    {
      label: "DIRECTION PRÉFECTORAL DES PERSONNES PHYSIQUES-CASABLANCA",
      value: "DIRECTION PRÉFECTORAL DES PERSONNES PHYSIQUES-CASABLANCA",
    },
    {
      label: "DIRECTION INTER PRÉFECTORAL  DES GRANDES ENTREPRISES-CASABLANCA",
      value: "DIRECTION INTER PRÉFECTORAL  DES GRANDES ENTREPRISES-CASABLANCA",
    },
    {
      label: "DIRECTION PROVINCIALE DES IMPOTS  DE MOHAMMADIA-MOHAMMADIA",
      value: "DIRECTION PROVINCIALE DES IMPOTS  DE MOHAMMADIA-MOHAMMADIA",
    },
    {
      label: "SUBDIVDES IMPOTS  DE BENSLIMANE-BENSLIMANE",
      value: "SUBDIVDES IMPOTS  DE BENSLIMANE-BENSLIMANE",
    },
  ] as const;

  const CommuneList = [{ label: "no data", value: "no data" }] as const;

  const TgrList = [
    { label: "Tit Mellil", value: "Tit Mellil" },
    { label: "Casablanca - Bouznika", value: "Casablanca - Bouznika" },
    {
      label: "Casablanca - Moulay Rachid",
      value: "Casablanca - Moulay Rachid",
    },
    { label: "Casablanca - Beausite", value: "Casablanca - Beausite" },
    { label: "Casablanca - Bernoussi", value: "Casablanca - Bernoussi" },
    {
      label: "Casablanca - Roches Noires",
      value: "Casablanca - Roches Noires",
    },
    {
      label: "Casablanca - Hay Mohammadi",
      value: "Casablanca - Hay Mohammadi",
    },
    {
      label: "Casablanca - Oued El Makhazine",
      value: "Casablanca - Oued El Makhazine",
    },
    { label: "Casablanca - Bourgogne", value: "Casablanca - Bourgogne" },
    { label: "Casablanca - Mers Sultan", value: "Casablanca - Mers Sultan" },
    { label: "Casablanca - El Fida", value: "Casablanca - El Fida" },
    { label: "Casablanca - Derb Sidna", value: "Casablanca - Derb Sidna" },
    { label: "Casablanca - Derb Omar", value: "Casablanca - Derb Omar" },
    { label: "Casablanca - Sidi Othmane", value: "Casablanca - Sidi Othmane" },
    { label: "Casablanca - Ain Chok", value: "Casablanca - Ain Chok" },
    {
      label: "Casablanca - Hay El Hassani",
      value: "Casablanca - Hay El Hassani",
    },
    { label: "Casablanca - Hay Errahma", value: "Casablanca - Hay Errahma" },
    { label: "Casablanca - Ouasis", value: "Casablanca - Ouasis" },
    { label: "Casablanca - Maârif", value: "Casablanca - Maârif" },
    { label: "Casablanca - Sidi Maarouf", value: "Casablanca - Sidi Maarouf" },
    { label: "Mohammadia Ville", value: "Mohammadia Ville" },
    { label: "Mohammadia Port", value: "Mohammadia Port" },
    { label: "Ben Slimane", value: "Ben Slimane" },
  ] as const;

  const AssuranceList = [
    { label: "CNSS", value: "CNSS" },
    { label: "Prevas", value: "Prevas" },
    { label: "Autre", value: "Autre" },
  ] as const;

  const AncfccList = [
    { label: "Office d’échange", value: "Office d’échange" },
    { label: "Al Omrane", value: "Al Omrane" },
    { label: "CGI", value: "CGI" },
    {
      label: "Société d’aménagement Znata",
      value: "Société d’aménagement Znata",
    },
    { label: "Diar Al Madina", value: "Diar Al Madina" },
    { label: "Autre", value: "Autre" },
  ] as const;

  console.log(form.watch("typeTwo"));
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b  from-blue-950 to-blue-800">
      <div className="mb-4 flex h-10 items-center justify-center rounded-lg bg-slate-300 px-2 text-center text-2xl font-semibold">
        <h1>Portail de réclamations</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full max-w-xl space-y-9 rounded-2xl bg-slate-300 px-8 py-12 shadow-xl shadow-slate-900"
        >
          {pathname === "/rec/option02" && (
            <>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex justify-center space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="IMPO" />
                          </FormControl>
                          <FormLabel className="font-normal">IMPO</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="TGR" />
                          </FormControl>
                          <FormLabel className="font-normal">TGR</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Commune" />
                          </FormControl>
                          <FormLabel className="font-normal">Commune</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("type") === "IMPO" && (
                <FormField
                  control={form.control}
                  name="impo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg">Impo</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between truncate",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? impoList.find(
                                    (info) => info.value === field.value,
                                  )?.label
                                : "Séléctioner Impo"}
                              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0 md:w-[500px]">
                          <Command>
                            <CommandInput placeholder="Taper le nom d'impo..." />
                            <ScrollArea className="h-[220px] px-4">
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {impoList.map((info) => (
                                  <CommandItem
                                    value={info.label}
                                    key={info.value}
                                    onSelect={() => {
                                      form.setValue("impo", info.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        info.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {info.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {form.watch("type") === "Commune" && (
                <FormField
                  control={form.control}
                  name="Commune"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg">Commune</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? CommuneList.find(
                                    (CommuneList) =>
                                      CommuneList.value === field.value,
                                  )?.label
                                : "Séléctionner la commune"}
                              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0 md:w-[500px]">
                          <Command>
                            <CommandInput placeholder="Taper le nom de la commune" />
                            <ScrollArea className="h-[150px] px-4">
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {CommuneList.map((CommuneList) => (
                                  <CommandItem
                                    value={CommuneList.label}
                                    key={CommuneList.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "Commune",
                                        CommuneList.value,
                                      );
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        CommuneList.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {CommuneList.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {form.watch("type") === "TGR" && (
                <FormField
                  control={form.control}
                  name="tgr"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg">TGR</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? TgrList.find(
                                    (TgrList) => TgrList.value === field.value,
                                  )?.label
                                : "Séléctionner TGR"}
                              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0 md:w-[500px]">
                          <Command>
                            <CommandInput placeholder="Trouver.." />
                            <ScrollArea className="h-[150px] px-4">
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {TgrList.map((TgrList) => (
                                  <CommandItem
                                    value={TgrList.label}
                                    key={TgrList.value}
                                    onSelect={() => {
                                      form.setValue("tgr", TgrList.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        TgrList.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {TgrList.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          {pathname === "/rec/option03" && (
            <>
              <FormField
                control={form.control}
                name="typeTwo"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex justify-center space-x-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="CDG" />
                            </FormControl>
                            <FormLabel className="font-normal">CDG</FormLabel>
                          </FormItem>
                          <FormControl>
                            <RadioGroupItem value="Banques" />
                          </FormControl>
                          <FormLabel className="font-normal">Banques</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Assurances" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Assurances
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("typeTwo") === "Banques" && (
                <FormField
                  control={form.control}
                  name="Banque"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Banque</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between bg-white",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? BanqueList.find(
                                    (info) => info.value === field.value,
                                  )?.label
                                : "Liste"}
                              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0 md:w-[500px]">
                          <Command className="h-[200px]">
                            <CommandInput placeholder="Liste" />
                            <ScrollArea className="h-[200px] px-4">
                              <CommandEmpty>Not found.</CommandEmpty>
                              <CommandGroup>
                                {BanqueList.map((info) => (
                                  <CommandItem
                                    value={info.label}
                                    key={info.value}
                                    onSelect={() => {
                                      form.setValue("Banque", info.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        info.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {info.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {form.watch("typeTwo") === "Assurances" && (
                <FormField
                  control={form.control}
                  name="Assurance"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Assurances</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between bg-white",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? AssuranceList.find(
                                    (info) => info.value === field.value,
                                  )?.label
                                : "Liste"}
                              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0 md:w-[500px]">
                          <Command>
                            <CommandInput placeholder="Liste" />
                            <ScrollArea className="px-4">
                              <CommandEmpty>Not found.</CommandEmpty>
                              <CommandGroup>
                                {AssuranceList.map((info) => (
                                  <CommandItem
                                    value={info.label}
                                    key={info.value}
                                    onSelect={() => {
                                      form.setValue("Assurance", info.value);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        info.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {info.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          {pathname === "/rec/option04" && (
            <>
              <FormField
                control={form.control}
                name="Ancfcc"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ancfcc / c.f</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between bg-white",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? AncfccList.find(
                                  (info) => info.value === field.value,
                                )?.label
                              : "Liste"}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0 md:w-[500px]">
                        <Command className="h-[200px]">
                          <CommandInput placeholder="Ancfcc / c.f" />
                          <ScrollArea className="h-[200px] px-4">
                            <CommandEmpty>Not found.</CommandEmpty>
                            <CommandGroup>
                              {AncfccList.map((info) => (
                                <CommandItem
                                  value={info.label}
                                  key={info.value}
                                  onSelect={() => {
                                    form.setValue("Ancfcc", info.value);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      info.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {info.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </ScrollArea>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Objet</FormLabel>
                <FormControl>
                  <Input className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reclamation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Détails</FormLabel>
                <FormControl>
                  <Textarea className="resize-none bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Envoyer
          </Button>
        </form>
      </Form>
      <Button
        className="mt-3 w-24 shadow-lg shadow-slate-900"
        variant="secondary"
        onClick={() => router.push("/")}
      >
        Retour
      </Button>
    </div>
  );
};

export default Rec;
