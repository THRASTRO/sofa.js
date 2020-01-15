/* Generate Test Data for tdbtt */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2;
  unsigned long long modulo = 0;
  printf("var tdbtt_results = [\n");
  for (t0 = -12; t0 <= 12; t0 += 3.75) {
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      for (t2 = -12; t2 <= 12; t2 += 3.75) {

        double res0 = {0};
        double res1 = {0};
        modulo = modulo > 3
          ? 0 : modulo + 1;
        if (modulo != 1) continue;
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%.28e", t2);
        printf(", ");
        printf("%d", eraTdbtt(t0, t1, t2, &res0, &res1));
        printf(", ");
        printf("%.28e", res0);
        printf(", ");
        printf("%.28e", res1);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
