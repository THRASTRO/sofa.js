/* Generate Test Data for dtdb */

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
  unsigned long long modulo = 0;
  printf("var dtdb_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {
          for (t4 = -12; t4 <= 12; t4 += 3.75) {
            for (t5 = -12; t5 <= 12; t5 += 3.75) {


              modulo = modulo > 3030
                ? 0 : modulo + 1;
              if (modulo != 1) continue;
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
              printf("%.28e", eraDtdb(t0, t1, t2, t3, t4, t5));
              printf("  ],\n");

            }
          }
        }
      }
    }
  }

  printf("];\n");
}
