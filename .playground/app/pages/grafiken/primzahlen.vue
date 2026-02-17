<template>
  <div class="space-y-30">
    <h1 class="header-title text-primary-600 hyphens-auto text-balance">Primzahlen</h1>
    <p class="lead mt-30 hyphens-auto lg:hyphens-none text-pretty">Die Bausteine der Mathematik &ndash; warum die 2 als einzige gerade Primzahl eine Sonderstellung einnimmt.</p>
    <div class="my-20 lg:mb-30 xl:pr-220">
      <div class="ck-content hyphens-auto lg:hyphens-none">
        <p>Eine Primzahl ist eine natürliche Zahl grösser als 1, die nur durch 1 und sich selbst teilbar ist. Die ersten Primzahlen sind 2, 3, 5, 7, 11, 13, 17, 19, 23 und 29. Bereits um 300 v.&nbsp;Chr. bewies Euklid, dass es unendlich viele Primzahlen gibt.</p>
      </div>
    </div>

    <div>
      <h4 class="text-lg font-bold text-primary-600 mt-40 md:mt-60 mb-15">Wie verteilen sich die Primzahlen?</h4>
      <div class="flex flex-col md:flex-row gap-20">
        <div class="md:flex-1 min-w-0">
          <img
            src="https://placehold.co/600x400?text=Primzahlen+bis+100"
            alt="Verteilung der Primzahlen bis 100"
            class="w-full h-auto rounded-large border border-gray-200"
          />
        </div>
        <div class="md:w-[280px] lg:w-[300px] shrink-0">
          <p class="text-base xl:text-lg text-gray-700">
            Von den ersten 100 natürlichen Zahlen sind 25 Primzahlen. Die Grafik zeigt ihre Verteilung. Je grösser die Zahlen werden, desto seltener treten Primzahlen auf &ndash; der Primzahlsatz beschreibt dieses Phänomen mathematisch: Die Wahrscheinlichkeit, dass eine zufällig gewählte grosse Zahl prim ist, ist umgekehrt proportional zu ihrer Stellenzahl.
          </p>
        </div>
      </div>
    </div>

    <div>
      <h4 class="text-lg font-bold text-primary-600 mt-40 md:mt-60 mb-15">Warum ist die 2 so besonders?</h4>
      <div class="flex flex-col md:flex-row gap-20">
        <div class="md:flex-1 min-w-0">
          <img
            src="https://placehold.co/600x400?text=Gerade+vs.+ungerade+Primzahlen"
            alt="Gerade vs. ungerade Primzahlen"
            class="w-full h-auto rounded-large border border-gray-200"
          />
        </div>
        <div class="md:w-[280px] lg:w-[300px] shrink-0">
          <p class="text-base xl:text-lg text-gray-700">
            Die 2 ist die einzige gerade Primzahl. Jede andere gerade Zahl ist durch 2 teilbar und damit keine Primzahl. Deshalb wird die 2 manchmal als «die seltsamste Primzahl» bezeichnet. Alle anderen Primzahlen sind ungerade und werden als «ungerade Primzahlen» bezeichnet.
          </p>
        </div>
      </div>
    </div>

    <div>
      <h4 class="text-lg font-bold text-primary-600 mt-40 md:mt-60 mb-15">Wo begegnen uns Primzahlen im Alltag?</h4>
      <div class="flex flex-col md:flex-row gap-20">
        <div class="md:flex-1 min-w-0">
          <img
            src="https://placehold.co/600x400?text=Anwendungen+von+Primzahlen"
            alt="Anwendungen von Primzahlen"
            class="w-full h-auto rounded-large border border-gray-200"
          />
        </div>
        <div class="md:w-[280px] lg:w-[300px] shrink-0">
          <p class="text-base xl:text-lg text-gray-700">
            Primzahlen sind die Grundlage moderner Verschlüsselung. Das RSA-Verfahren nutzt die Tatsache, dass es einfach ist, zwei grosse Primzahlen zu multiplizieren, aber extrem schwer, das Produkt wieder in seine Primfaktoren zu zerlegen. Jede sichere Internetverbindung basiert auf diesem Prinzip. Auch Zikaden nutzen Primzahlen: Sie erscheinen alle 7, 13 oder 17 Jahre, um Fressfeinden auszuweichen.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
