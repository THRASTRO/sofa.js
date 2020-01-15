/* Generate Test Data for plan94 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  int t2;
  printf("var plan94_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {
      for (t2 = -96; t2 <= 96; t2 += 32) {

        double res0[2][3] = {0};
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        printf("%d", t2);
        printf(", ");
        printf("%d", eraPlan94(t0, t1, t2, res0));
        printf(", ");
        exportPV3(res0);
        printf("  ],\n");

      }
    }
  }

  printf("];\n");
}
