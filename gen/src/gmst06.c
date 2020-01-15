/* Generate Test Data for gmst06 */

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
  unsigned long long modulo = 0;
  printf("var gmst06_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {


          modulo = modulo > 4
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
          printf("%.28e", eraGmst06(t0, t1, t2, t3));
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}
