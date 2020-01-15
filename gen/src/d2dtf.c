/* Generate Test Data for d2dtf */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  const char* t0;
  int ti0;;
  int t1;
  double t2;
  double t3;
  unsigned long long modulo = 0;
  printf("var d2dtf_results = [\n");
  for (ti0 = 0; ti0 <= 1; ti0 += 1) { t0 = tscale[ti0];
    for (t1 = -7; t1 <= 5; t1 += 3) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {
        for (t3 = -12; t3 <= 12; t3 += 3.75) {

          int res0 = {0};
          int res1 = {0};
          int res2 = {0};
          int res3[4] = {0};
          modulo = modulo > 4
            ? 0 : modulo + 1;
          if (modulo != 1) continue;
          printf("  [");
          printf("'%s'", t0);
          printf(", ");
          printf("%d", t1);
          printf(", ");
          printf("%.28e", t2);
          printf(", ");
          printf("%.28e", t3);
          printf(", ");
          printf("%d", eraD2dtf(t0, t1, t2, t3, &res0, &res1, &res2, res3));
          printf(", ");
          printf("%d", res0);
          printf(", ");
          printf("%d", res1);
          printf(", ");
          printf("%d", res2);
          printf(", ");
          exportDMSF(res3);
          printf("  ],\n");

        }
      }
    }
  }

  printf("];\n");
}
