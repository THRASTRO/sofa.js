/* Generate Test Data for atccq */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  double t3;
  double t4;
  double t5;
  eraASTROM t6;
  int ti6;;
  unsigned long long modulo = 0;
  printf("var atccq_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {
          for (t4 = -12; t4 <= 12; t4 += 3.75) {
            for (t5 = -12; t5 <= 12; t5 += 3.75) {
              for (ti6 = 0; ti6 <= 3; ti6 += 1) {

                double res0 = {0};
                double res1 = {0};
                modulo = modulo > 202
                  ? 0 : modulo + 1;
                if (modulo != 1) continue;
                t6 = astroms[ti6];
                printf("  [");
                printf("%.28e", t0);
                printf(", ");
                printf("%.28e", t1);
                printf(", ");
                printf("%.28e", t2);
                printf(", ");
                printf("%.28e", t3);
                printf(", ");
                printf("%.28e", t4);
                printf(", ");
                printf("%.28e", t5);
                printf(", ");
                exportASTROM(t6);
                printf(", ");
                eraAtccq(t0, t1, t2, t3, t4, t5, &t6, &res0, &res1);
                printf("%.28e", res0);
                printf(", ");
                printf("%.28e", res1);
                printf("  ],\n");

              }
            }
          }
        }
      }
    }
  }

  printf("];\n");
}
