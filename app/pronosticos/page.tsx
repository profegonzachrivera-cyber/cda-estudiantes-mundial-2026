"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type TeamKey =
  | "mexico" | "southAfrica" | "southKorea" | "czechRepublic" | "canada"
  | "bosnia" | "usa" | "paraguay" | "qatar" | "switzerland" | "brazil"
  | "morocco" | "haiti" | "scotland" | "australia" | "turkey" | "germany"
  | "curacao" | "ivoryCoast" | "ecuador" | "netherlands" | "japan"
  | "sweden" | "tunisia" | "spain" | "capeVerde" | "belgium" | "egypt"
  | "saudiArabia" | "uruguay" | "iran" | "newZealand" | "france"
  | "senegal" | "iraq" | "norway" | "argentina" | "algeria" | "austria"
  | "jordan" | "portugal" | "drCongo" | "england" | "croatia" | "ghana"
  | "panama" | "uzbekistan" | "colombia";

type Match = {
  id: number;
  matchday: "Fecha 1" | "Fecha 2" | "Fecha 3";
  group: string;
  dateEs: string;
  dateEn: string;
  chileTime: string;
  irelandTime: string;
  lockDate: string;
  home: TeamKey;
  away: TeamKey;
};

const teams: Record<TeamKey, { es: string; en: string; flag: string }> = {
  mexico: { es: "México", en: "Mexico", flag: "mx" },
  southAfrica: { es: "Sudáfrica", en: "South Africa", flag: "za" },
  southKorea: { es: "Corea del Sur", en: "South Korea", flag: "kr" },
  czechRepublic: { es: "Rep. Checa", en: "Czech Republic", flag: "cz" },
  canada: { es: "Canadá", en: "Canada", flag: "ca" },
  bosnia: { es: "Bosnia y Herzegovina", en: "Bosnia and Herzegovina", flag: "ba" },
  usa: { es: "Estados Unidos", en: "United States", flag: "us" },
  paraguay: { es: "Paraguay", en: "Paraguay", flag: "py" },
  qatar: { es: "Qatar", en: "Qatar", flag: "qa" },
  switzerland: { es: "Suiza", en: "Switzerland", flag: "ch" },
  brazil: { es: "Brasil", en: "Brazil", flag: "br" },
  morocco: { es: "Marruecos", en: "Morocco", flag: "ma" },
  haiti: { es: "Haití", en: "Haiti", flag: "ht" },
  scotland: { es: "Escocia", en: "Scotland", flag: "gb-sct" },
  australia: { es: "Australia", en: "Australia", flag: "au" },
  turkey: { es: "Turquía", en: "Turkey", flag: "tr" },
  germany: { es: "Alemania", en: "Germany", flag: "de" },
  curacao: { es: "Curazao", en: "Curaçao", flag: "cw" },
  ivoryCoast: { es: "Costa de Marfil", en: "Ivory Coast", flag: "ci" },
  ecuador: { es: "Ecuador", en: "Ecuador", flag: "ec" },
  netherlands: { es: "Países Bajos", en: "Netherlands", flag: "nl" },
  japan: { es: "Japón", en: "Japan", flag: "jp" },
  sweden: { es: "Suecia", en: "Sweden", flag: "se" },
  tunisia: { es: "Túnez", en: "Tunisia", flag: "tn" },
  spain: { es: "España", en: "Spain", flag: "es" },
  capeVerde: { es: "Cabo Verde", en: "Cape Verde", flag: "cv" },
  belgium: { es: "Bélgica", en: "Belgium", flag: "be" },
  egypt: { es: "Egipto", en: "Egypt", flag: "eg" },
  saudiArabia: { es: "Arabia Saudita", en: "Saudi Arabia", flag: "sa" },
  uruguay: { es: "Uruguay", en: "Uruguay", flag: "uy" },
  iran: { es: "Irán", en: "Iran", flag: "ir" },
  newZealand: { es: "Nueva Zelanda", en: "New Zealand", flag: "nz" },
  france: { es: "Francia", en: "France", flag: "fr" },
  senegal: { es: "Senegal", en: "Senegal", flag: "sn" },
  iraq: { es: "Irak", en: "Iraq", flag: "iq" },
  norway: { es: "Noruega", en: "Norway", flag: "no" },
  argentina: { es: "Argentina", en: "Argentina", flag: "ar" },
  algeria: { es: "Argelia", en: "Algeria", flag: "dz" },
  austria: { es: "Austria", en: "Austria", flag: "at" },
  jordan: { es: "Jordania", en: "Jordan", flag: "jo" },
  portugal: { es: "Portugal", en: "Portugal", flag: "pt" },
  drCongo: { es: "RD Congo", en: "DR Congo", flag: "cd" },
  england: { es: "Inglaterra", en: "England", flag: "gb-eng" },
  croatia: { es: "Croacia", en: "Croatia", flag: "hr" },
  ghana: { es: "Ghana", en: "Ghana", flag: "gh" },
  panama: { es: "Panamá", en: "Panama", flag: "pa" },
  uzbekistan: { es: "Uzbekistán", en: "Uzbekistan", flag: "uz" },
  colombia: { es: "Colombia", en: "Colombia", flag: "co" },
};

const lockDates = {
  "Fecha 1": "2026-06-11T15:00:00-04:00",
  "Fecha 2": "2026-06-18T12:00:00-04:00",
  "Fecha 3": "2026-06-24T15:00:00-04:00",
};

const matches: Match[] = [
  { id: 1, matchday: "Fecha 1", group: "A", dateEs: "Jueves 11 junio 2026", dateEn: "Thursday, June 11, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "mexico", away: "southAfrica" },
  { id: 2, matchday: "Fecha 1", group: "A", dateEs: "Jueves 11 junio 2026", dateEn: "Thursday, June 11, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "southKorea", away: "czechRepublic" },
  { id: 3, matchday: "Fecha 1", group: "B", dateEs: "Viernes 12 junio 2026", dateEn: "Friday, June 12, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "canada", away: "bosnia" },
  { id: 4, matchday: "Fecha 1", group: "D", dateEs: "Viernes 12 junio 2026", dateEn: "Friday, June 12, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "usa", away: "paraguay" },
  { id: 5, matchday: "Fecha 1", group: "B", dateEs: "Sábado 13 junio 2026", dateEn: "Saturday, June 13, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "qatar", away: "switzerland" },
  { id: 6, matchday: "Fecha 1", group: "C", dateEs: "Sábado 13 junio 2026", dateEn: "Saturday, June 13, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "brazil", away: "morocco" },
  { id: 7, matchday: "Fecha 1", group: "C", dateEs: "Sábado 13 junio 2026", dateEn: "Saturday, June 13, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "haiti", away: "scotland" },
  { id: 8, matchday: "Fecha 1", group: "D", dateEs: "Domingo 14 junio 2026", dateEn: "Sunday, June 14, 2026", chileTime: "00:00 hrs Chile", irelandTime: "05:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "australia", away: "turkey" },
  { id: 9, matchday: "Fecha 1", group: "E", dateEs: "Domingo 14 junio 2026", dateEn: "Sunday, June 14, 2026", chileTime: "13:00 hrs Chile", irelandTime: "18:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "germany", away: "curacao" },
  { id: 10, matchday: "Fecha 1", group: "E", dateEs: "Domingo 14 junio 2026", dateEn: "Sunday, June 14, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "ivoryCoast", away: "ecuador" },
  { id: 11, matchday: "Fecha 1", group: "F", dateEs: "Domingo 14 junio 2026", dateEn: "Sunday, June 14, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "netherlands", away: "japan" },
  { id: 12, matchday: "Fecha 1", group: "F", dateEs: "Domingo 14 junio 2026", dateEn: "Sunday, June 14, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "sweden", away: "tunisia" },

  { id: 13, matchday: "Fecha 1", group: "H", dateEs: "Lunes 15 junio 2026", dateEn: "Monday, June 15, 2026", chileTime: "12:00 hrs Chile", irelandTime: "17:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "spain", away: "capeVerde" },
  { id: 14, matchday: "Fecha 1", group: "G", dateEs: "Lunes 15 junio 2026", dateEn: "Monday, June 15, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "belgium", away: "egypt" },
  { id: 15, matchday: "Fecha 1", group: "H", dateEs: "Lunes 15 junio 2026", dateEn: "Monday, June 15, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "saudiArabia", away: "uruguay" },
  { id: 16, matchday: "Fecha 1", group: "G", dateEs: "Lunes 15 junio 2026", dateEn: "Monday, June 15, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "iran", away: "newZealand" },
  { id: 17, matchday: "Fecha 1", group: "I", dateEs: "Martes 16 junio 2026", dateEn: "Tuesday, June 16, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "france", away: "senegal" },
  { id: 18, matchday: "Fecha 1", group: "I", dateEs: "Martes 16 junio 2026", dateEn: "Tuesday, June 16, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "iraq", away: "norway" },
  { id: 19, matchday: "Fecha 1", group: "J", dateEs: "Martes 16 junio 2026", dateEn: "Tuesday, June 16, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "argentina", away: "algeria" },
  { id: 20, matchday: "Fecha 1", group: "J", dateEs: "Miércoles 17 junio 2026", dateEn: "Wednesday, June 17, 2026", chileTime: "00:00 hrs Chile", irelandTime: "05:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "austria", away: "jordan" },
  { id: 21, matchday: "Fecha 1", group: "K", dateEs: "Miércoles 17 junio 2026", dateEn: "Wednesday, June 17, 2026", chileTime: "13:00 hrs Chile", irelandTime: "18:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "portugal", away: "drCongo" },
  { id: 22, matchday: "Fecha 1", group: "L", dateEs: "Miércoles 17 junio 2026", dateEn: "Wednesday, June 17, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "england", away: "croatia" },
  { id: 23, matchday: "Fecha 1", group: "L", dateEs: "Miércoles 17 junio 2026", dateEn: "Wednesday, June 17, 2026", chileTime: "19:00 hrs Chile", irelandTime: "00:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "ghana", away: "panama" },
  { id: 24, matchday: "Fecha 1", group: "K", dateEs: "Miércoles 17 junio 2026", dateEn: "Wednesday, June 17, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 1"], home: "uzbekistan", away: "colombia" },

  { id: 25, matchday: "Fecha 2", group: "A", dateEs: "Jueves 18 junio 2026", dateEn: "Thursday, June 18, 2026", chileTime: "12:00 hrs Chile", irelandTime: "17:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "czechRepublic", away: "southAfrica" },
  { id: 26, matchday: "Fecha 2", group: "B", dateEs: "Jueves 18 junio 2026", dateEn: "Thursday, June 18, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "switzerland", away: "bosnia" },
  { id: 27, matchday: "Fecha 2", group: "B", dateEs: "Jueves 18 junio 2026", dateEn: "Thursday, June 18, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "canada", away: "qatar" },
  { id: 28, matchday: "Fecha 2", group: "A", dateEs: "Jueves 18 junio 2026", dateEn: "Thursday, June 18, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "mexico", away: "southKorea" },
  { id: 29, matchday: "Fecha 2", group: "D", dateEs: "Viernes 19 junio 2026", dateEn: "Friday, June 19, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "usa", away: "australia" },
  { id: 30, matchday: "Fecha 2", group: "C", dateEs: "Viernes 19 junio 2026", dateEn: "Friday, June 19, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "scotland", away: "morocco" },
  { id: 31, matchday: "Fecha 2", group: "C", dateEs: "Viernes 19 junio 2026", dateEn: "Friday, June 19, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "brazil", away: "haiti" },
  { id: 32, matchday: "Fecha 2", group: "D", dateEs: "Sábado 20 junio 2026", dateEn: "Saturday, June 20, 2026", chileTime: "00:00 hrs Chile", irelandTime: "05:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "turkey", away: "paraguay" },
  { id: 33, matchday: "Fecha 2", group: "F", dateEs: "Sábado 20 junio 2026", dateEn: "Saturday, June 20, 2026", chileTime: "13:00 hrs Chile", irelandTime: "18:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "netherlands", away: "sweden" },
  { id: 34, matchday: "Fecha 2", group: "E", dateEs: "Sábado 20 junio 2026", dateEn: "Saturday, June 20, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "germany", away: "ivoryCoast" },
  { id: 35, matchday: "Fecha 2", group: "E", dateEs: "Sábado 20 junio 2026", dateEn: "Saturday, June 20, 2026", chileTime: "20:00 hrs Chile", irelandTime: "01:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "ecuador", away: "curacao" },
  { id: 36, matchday: "Fecha 2", group: "F", dateEs: "Domingo 21 junio 2026", dateEn: "Sunday, June 21, 2026", chileTime: "00:00 hrs Chile", irelandTime: "05:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "tunisia", away: "japan" },

  { id: 37, matchday: "Fecha 2", group: "H", dateEs: "Domingo 21 junio 2026", dateEn: "Sunday, June 21, 2026", chileTime: "12:00 hrs Chile", irelandTime: "17:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "spain", away: "saudiArabia" },
  { id: 38, matchday: "Fecha 2", group: "G", dateEs: "Domingo 21 junio 2026", dateEn: "Sunday, June 21, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "belgium", away: "iran" },
  { id: 39, matchday: "Fecha 2", group: "H", dateEs: "Domingo 21 junio 2026", dateEn: "Sunday, June 21, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "uruguay", away: "capeVerde" },
  { id: 40, matchday: "Fecha 2", group: "G", dateEs: "Domingo 21 junio 2026", dateEn: "Sunday, June 21, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "newZealand", away: "egypt" },
  { id: 41, matchday: "Fecha 2", group: "J", dateEs: "Lunes 22 junio 2026", dateEn: "Monday, June 22, 2026", chileTime: "13:00 hrs Chile", irelandTime: "18:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "argentina", away: "austria" },
  { id: 42, matchday: "Fecha 2", group: "I", dateEs: "Lunes 22 junio 2026", dateEn: "Monday, June 22, 2026", chileTime: "17:00 hrs Chile", irelandTime: "22:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "france", away: "iraq" },
  { id: 43, matchday: "Fecha 2", group: "I", dateEs: "Lunes 22 junio 2026", dateEn: "Monday, June 22, 2026", chileTime: "20:00 hrs Chile", irelandTime: "01:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "norway", away: "senegal" },
  { id: 44, matchday: "Fecha 2", group: "J", dateEs: "Lunes 22 junio 2026", dateEn: "Monday, June 22, 2026", chileTime: "23:00 hrs Chile", irelandTime: "04:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "jordan", away: "algeria" },
  { id: 45, matchday: "Fecha 2", group: "K", dateEs: "Martes 23 junio 2026", dateEn: "Tuesday, June 23, 2026", chileTime: "13:00 hrs Chile", irelandTime: "18:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "portugal", away: "uzbekistan" },
  { id: 46, matchday: "Fecha 2", group: "L", dateEs: "Martes 23 junio 2026", dateEn: "Tuesday, June 23, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "england", away: "ghana" },
  { id: 47, matchday: "Fecha 2", group: "L", dateEs: "Martes 23 junio 2026", dateEn: "Tuesday, June 23, 2026", chileTime: "19:00 hrs Chile", irelandTime: "00:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "panama", away: "croatia" },
  { id: 48, matchday: "Fecha 2", group: "K", dateEs: "Martes 23 junio 2026", dateEn: "Tuesday, June 23, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 2"], home: "colombia", away: "drCongo" },

  { id: 49, matchday: "Fecha 3", group: "B", dateEs: "Miércoles 24 junio 2026", dateEn: "Wednesday, June 24, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "switzerland", away: "canada" },
  { id: 50, matchday: "Fecha 3", group: "B", dateEs: "Miércoles 24 junio 2026", dateEn: "Wednesday, June 24, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "bosnia", away: "qatar" },
  { id: 51, matchday: "Fecha 3", group: "C", dateEs: "Miércoles 24 junio 2026", dateEn: "Wednesday, June 24, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "scotland", away: "brazil" },
  { id: 52, matchday: "Fecha 3", group: "C", dateEs: "Miércoles 24 junio 2026", dateEn: "Wednesday, June 24, 2026", chileTime: "18:00 hrs Chile", irelandTime: "23:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "morocco", away: "haiti" },
  { id: 53, matchday: "Fecha 3", group: "A", dateEs: "Miércoles 24 junio 2026", dateEn: "Wednesday, June 24, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "czechRepublic", away: "mexico" },
  { id: 54, matchday: "Fecha 3", group: "A", dateEs: "Miércoles 24 junio 2026", dateEn: "Wednesday, June 24, 2026", chileTime: "21:00 hrs Chile", irelandTime: "02:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "southAfrica", away: "southKorea" },
  { id: 55, matchday: "Fecha 3", group: "E", dateEs: "Jueves 25 junio 2026", dateEn: "Thursday, June 25, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "curacao", away: "ivoryCoast" },
  { id: 56, matchday: "Fecha 3", group: "E", dateEs: "Jueves 25 junio 2026", dateEn: "Thursday, June 25, 2026", chileTime: "16:00 hrs Chile", irelandTime: "21:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "ecuador", away: "germany" },
  { id: 57, matchday: "Fecha 3", group: "F", dateEs: "Jueves 25 junio 2026", dateEn: "Thursday, June 25, 2026", chileTime: "19:00 hrs Chile", irelandTime: "00:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "japan", away: "sweden" },
  { id: 58, matchday: "Fecha 3", group: "F", dateEs: "Jueves 25 junio 2026", dateEn: "Thursday, June 25, 2026", chileTime: "19:00 hrs Chile", irelandTime: "00:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "tunisia", away: "netherlands" },
  { id: 59, matchday: "Fecha 3", group: "D", dateEs: "Jueves 25 junio 2026", dateEn: "Thursday, June 25, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "turkey", away: "usa" },
  { id: 60, matchday: "Fecha 3", group: "D", dateEs: "Jueves 25 junio 2026", dateEn: "Thursday, June 25, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "paraguay", away: "australia" },

  { id: 61, matchday: "Fecha 3", group: "I", dateEs: "Viernes 26 junio 2026", dateEn: "Friday, June 26, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "norway", away: "france" },
  { id: 62, matchday: "Fecha 3", group: "I", dateEs: "Viernes 26 junio 2026", dateEn: "Friday, June 26, 2026", chileTime: "15:00 hrs Chile", irelandTime: "20:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "senegal", away: "iraq" },
  { id: 63, matchday: "Fecha 3", group: "H", dateEs: "Viernes 26 junio 2026", dateEn: "Friday, June 26, 2026", chileTime: "20:00 hrs Chile", irelandTime: "01:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "capeVerde", away: "saudiArabia" },
  { id: 64, matchday: "Fecha 3", group: "H", dateEs: "Viernes 26 junio 2026", dateEn: "Friday, June 26, 2026", chileTime: "20:00 hrs Chile", irelandTime: "01:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "uruguay", away: "spain" },
  { id: 65, matchday: "Fecha 3", group: "G", dateEs: "Viernes 26 junio 2026", dateEn: "Friday, June 26, 2026", chileTime: "23:00 hrs Chile", irelandTime: "04:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "egypt", away: "iran" },
  { id: 66, matchday: "Fecha 3", group: "G", dateEs: "Viernes 26 junio 2026", dateEn: "Friday, June 26, 2026", chileTime: "23:00 hrs Chile", irelandTime: "04:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "newZealand", away: "belgium" },
  { id: 67, matchday: "Fecha 3", group: "L", dateEs: "Sábado 27 junio 2026", dateEn: "Saturday, June 27, 2026", chileTime: "17:00 hrs Chile", irelandTime: "22:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "panama", away: "england" },
  { id: 68, matchday: "Fecha 3", group: "L", dateEs: "Sábado 27 junio 2026", dateEn: "Saturday, June 27, 2026", chileTime: "17:00 hrs Chile", irelandTime: "22:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "croatia", away: "ghana" },
  { id: 69, matchday: "Fecha 3", group: "K", dateEs: "Sábado 27 junio 2026", dateEn: "Saturday, June 27, 2026", chileTime: "19:30 hrs Chile", irelandTime: "00:30 Ireland time", lockDate: lockDates["Fecha 3"], home: "colombia", away: "portugal" },
  { id: 70, matchday: "Fecha 3", group: "K", dateEs: "Sábado 27 junio 2026", dateEn: "Saturday, June 27, 2026", chileTime: "19:30 hrs Chile", irelandTime: "00:30 Ireland time", lockDate: lockDates["Fecha 3"], home: "drCongo", away: "uzbekistan" },
  { id: 71, matchday: "Fecha 3", group: "J", dateEs: "Sábado 27 junio 2026", dateEn: "Saturday, June 27, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "algeria", away: "austria" },
  { id: 72, matchday: "Fecha 3", group: "J", dateEs: "Sábado 27 junio 2026", dateEn: "Saturday, June 27, 2026", chileTime: "22:00 hrs Chile", irelandTime: "03:00 Ireland time", lockDate: lockDates["Fecha 3"], home: "jordan", away: "argentina" },
];

export default function PronosticosPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [section, setSection] = useState(0);
const [participant, setParticipant] = useState({
  nombre: "",
  email: "",
  whatsapp: "",
  pais: "",
});

const [predictions, setPredictions] = useState<
  Record<number, { home: string; away: string }>
>({});

const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");
  const isSpanish = language === "es";
  const matchesPerSection = 12;
  const totalSections = Math.ceil(matches.length / matchesPerSection);

  const currentMatches = matches.slice(
    section * matchesPerSection,
    section * matchesPerSection + matchesPerSection
  );

  const isMatchdayLocked = (lockDate: string) => {
    return new Date() >= new Date(lockDate);
  };

  const teamName = (team: TeamKey) => (isSpanish ? teams[team].es : teams[team].en);
const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setParticipant({
    ...participant,
    [e.target.name]: e.target.value,
  });
};

const handlePredictionChange = (
  matchId: number,
  team: "home" | "away",
  value: string
) => {
  setPredictions({
    ...predictions,
    [matchId]: {
      ...predictions[matchId],
      [team]: value,
    },
  });
};

const savePredictions = async () => {
  setMessage("");

  if (!participant.nombre || !participant.email || !participant.whatsapp) {
    setMessage(
      isSpanish
        ? "Completa nombre, correo y WhatsApp antes de guardar."
        : "Please complete name, email and WhatsApp before saving."
    );
    return;
  }
alert("Intentando guardar participante");
const { data: participanteData, error: participantError } = await supabase
  .from("participantes")
  .upsert(
    {
      nombre: participant.nombre,
      email: participant.email,
      whatsapp: participant.whatsapp,
      pais: participant.pais,
      estado_pago: "pendiente",
      puntos: 0,
    },
    { onConflict: "email" }
  )
  .select();
alert("Upsert participante ejecutado");
console.log("PARTICIPANTE:", participanteData);
console.error("ERROR PARTICIPANTE:", participantError);
  {
    nombre: participant.nombre,
    email: participant.email,
    whatsapp: participant.whatsapp,
    pais: participant.pais,
    estado_pago: "pendiente",
    puntos: 0,
  },
  { onConflict: "email" }
);

if (participantError) {alert(JSON.stringify(participantError));
  console.error("ERROR PARTICIPANTE:", participantError);
alert(JSON.stringify(participantError));
  setMessage(
    isSpanish
      ? "No se pudo crear el participante. Revisa la configuración de Supabase."
      : "Participant could not be created. Check Supabase configuration."
  );
  return;
}
const rows = currentMatches.map((match) => ({
      nombre: participant.nombre,
      email: participant.email,
      whatsapp: participant.whatsapp,
      pais: participant.pais,
      partido_id: match.id,
      equipo_local: teamName(match.home),
      equipo_visitante: teamName(match.away),
      goles_local: Number(predictions[match.id]?.home ?? 0),
      goles_visitante: Number(predictions[match.id]?.away ?? 0),
      fase: "Fase de Grupos",
      fecha: isSpanish ? match.dateEs : match.dateEn,
      grupo: match.group,
      puntos: 0,
    }));

  if (rows.length === 0) {
    setMessage(
      isSpanish
        ? "Debes ingresar al menos un pronóstico."
        : "You must enter at least one prediction."
    );
    return;
  }
if (rows.length < currentMatches.length) {
  const confirmSave = window.confirm(
    isSpanish
      ? `Solo completaste ${rows.length} de ${currentMatches.length} partidos. ¿Quieres guardar igual?`
      : `You completed only ${rows.length} of ${currentMatches.length} matches. Do you want to save anyway?`
  );

  if (!confirmSave) {
    return;
  }
}
  setSaving(true);

  const { error } = await supabase.from("pronosticos").insert(rows);

  setSaving(false);

  if (error) {
    console.log(error);
    setMessage(
      isSpanish
        ? "No se pudieron guardar los pronósticos. Intenta nuevamente."
        : "Predictions could not be saved. Please try again."
    );
    return;
  }

 setMessage(
  isSpanish
    ? `✅ Se guardaron ${rows.length} pronósticos correctamente.`
    : `✅ ${rows.length} predictions saved successfully.`
);
};
  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-4">
          <a href="/" className="text-blue-300 hover:underline">
            ← {isSpanish ? "Volver al inicio" : "Back to home"}
          </a>

          <div className="flex rounded-xl border border-slate-500 overflow-hidden">
            <button
              onClick={() => setLanguage("es")}
              className={`px-4 py-2 font-bold ${
                isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇪🇸 Español
            </button>

            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 font-bold ${
                !isSpanish ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <section className="text-center my-10">
          <h1 className="text-5xl font-extrabold mb-4">
            ⚽ {isSpanish ? "Pronósticos" : "Predictions"}
          </h1>

          <p className="text-slate-300 text-lg">
            {isSpanish
              ? "Fase de Grupos del Mundial 2026. Se muestran 12 partidos por sección."
              : "World Cup 2026 Group Stage. Matches are displayed in sections of 12."}
          </p>
        </section>
<div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-600">
  <h2 className="text-2xl font-extrabold mb-5">
    👤 {isSpanish ? "Datos del participante" : "Participant details"}
  </h2>

  <p className="text-slate-300 mb-5">
    {isSpanish
      ? "Usa los mismos datos que enviaste en tu inscripción por WhatsApp."
      : "Use the same details you sent in your WhatsApp registration."}
  </p>

  <div className="grid md:grid-cols-2 gap-4">
    <input
      name="nombre"
      value={participant.nombre}
      onChange={handleParticipantChange}
      className="p-4 rounded-xl bg-white text-black"
      placeholder={isSpanish ? "Nombre completo" : "Full name"}
    />

    <input
      name="email"
      value={participant.email}
      onChange={handleParticipantChange}
      className="p-4 rounded-xl bg-white text-black"
      placeholder={isSpanish ? "Correo electrónico" : "Email address"}
    />

    <input
      name="whatsapp"
      value={participant.whatsapp}
      onChange={handleParticipantChange}
      className="p-4 rounded-xl bg-white text-black"
      placeholder="WhatsApp"
    />

    <input
      name="pais"
      value={participant.pais}
      onChange={handleParticipantChange}
      className="p-4 rounded-xl bg-white text-black"
      placeholder={isSpanish ? "País" : "Country"}
    />
  </div>
</div>
        <div className="flex gap-3 flex-wrap justify-center mb-8">
          {Array.from({ length: totalSections }, (_, index) => (
            <button
              key={index}
              onClick={() => setSection(index)}
              className={`px-5 py-3 rounded-xl font-bold ${
                section === index ? "bg-yellow-400 text-black" : "bg-slate-700"
              }`}
            >
              {index * 12 + 1}-{Math.min((index + 1) * 12, matches.length)}
            </button>
          ))}
        </div>

        <div className="bg-yellow-400 text-black rounded-xl p-5 mb-8 text-center font-bold">
          ⏰{" "}
          {isSpanish
            ? "Los pronósticos de cada fecha se cerrarán cuando comience el primer partido de esa fecha."
            : "Predictions for each matchday will close when the first match of that matchday begins."}
        </div>

        <div className="grid gap-6">
          {currentMatches.map((match) => {
            const locked = isMatchdayLocked(match.lockDate);
            const homeTeam = teams[match.home];
            const awayTeam = teams[match.away];

            return (
              <div
                key={match.id}
                className={`rounded-2xl p-6 border ${
                  locked
                    ? "bg-slate-900 border-red-500 opacity-70"
                    : "bg-slate-800 border-slate-600"
                }`}
              >
                <div className="flex justify-between flex-col md:flex-row gap-4 mb-5">
                  <div>
                    <p className="text-yellow-400 font-bold">
                      {isSpanish ? "Partido" : "Match"} {match.id} ·{" "}
                      {isSpanish
                        ? match.matchday
                        : match.matchday.replace("Fecha", "Matchday")}{" "}
                      · {isSpanish ? "Grupo" : "Group"} {match.group}
                    </p>

                    <p className="text-slate-300">
                      {isSpanish ? match.dateEs : match.dateEn} ·{" "}
                      {isSpanish ? match.chileTime : match.irelandTime}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-xl font-bold text-center ${
                      locked ? "bg-red-600" : "bg-blue-700"
                    }`}
                  >
                    {locked
                      ? isSpanish
                        ? "Fecha cerrada"
                        : "Matchday closed"
                      : isSpanish
                      ? "Abierto"
                      : "Open"}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_80px_30px_80px_1fr] items-center gap-3">
                  <div className="flex items-center justify-end gap-2 font-bold">
                    <img
                      src={`https://flagcdn.com/w40/${homeTeam.flag}.png`}
                      alt={teamName(match.home)}
                      className="h-6 rounded"
                    />
                    <span>{teamName(match.home)}</span>
                  </div>

                  <input
                    type="number"
                    min="0"
                    disabled={locked}
                    value={predictions[match.id]?.home ?? ""}
onChange={(e) => handlePredictionChange(match.id, "home", e.target.value)}
                    className="p-3 rounded-xl bg-white text-black text-center font-bold disabled:bg-slate-500"
                    placeholder="0"
                  />

                  <span className="text-center text-2xl font-bold">-</span>

                  <input
                    type="number"
                    min="0"
                    disabled={locked}
                    value={predictions[match.id]?.away ?? ""}
onChange={(e) => handlePredictionChange(match.id, "away", e.target.value)}
                    className="p-3 rounded-xl bg-white text-black text-center font-bold disabled:bg-slate-500"
                    placeholder="0"
                  />

                  <div className="flex items-center gap-2 font-bold">
                    <img
                      src={`https://flagcdn.com/w40/${awayTeam.flag}.png`}
                      alt={teamName(match.away)}
                      className="h-6 rounded"
                    />
                    <span>{teamName(match.away)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
{message && (
  <div className="mt-6 p-4 rounded-xl bg-slate-800 border border-slate-600 text-center">
    {message}
  </div>
)}
   <button
  onClick={savePredictions}
  disabled={saving}
  className="w-full mt-8 bg-yellow-400 text-black px-6 py-5 rounded-xl font-extrabold text-xl hover:bg-yellow-300 disabled:bg-slate-500"
>
{saving
  ? (isSpanish ? "Guardando..." : "Saving...")
  : `💾 ${isSpanish ? "Guardar pronósticos" : "Save predictions"}`}
          </button>
      </div>
    </main>
  );
}