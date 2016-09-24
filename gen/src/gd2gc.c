/* Generate Test Data for gd2gc */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  int t0;
  double t1;
  double t2;
  double t3;
  unsigned long long modulo = 0;
  printf("var gd2gc_results = [\n");
  for (t0 = 1; t0 <= 3; t0 += 1) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {

          double res0[3] = {0};
          modulo = modulo > 4
            ? 0 : modulo + 1;
          if (modulo != 1) continue;
          printf("  [");
          printf("%d", t0);
          printf(", ");
          printf("%.28e", t1);
          printf(", ");
          printf("%.28e", t2);
          printf(", ");
          printf("%.28e", t3);
          printf(", ");
          printf("%d", iauGd2gc(t0, t1, t2, t3, res0));
          printf(", ");
          exportV3(res0);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}
