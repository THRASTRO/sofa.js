/* Generate Test Data for apcs13 */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  double t2[2][3];
  unsigned long long modulo = 0;
  printf("var apcs13_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 496000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 496000) {
      for (t2[0][0] = - 1.73333 * 0.0 - 1; t2[0][0] <= + 1.73333 * 1.0 - 1; t2[0][0] += 1.73333) {
      for (t2[1][0] = - 1.73333 * 0.0 - 1; t2[1][0] <= + 1.73333 * 1.0 - 1; t2[1][0] += 1.73333) {
      for (t2[0][1] = - 1.73333 * 0.0 - 1; t2[0][1] <= + 1.73333 * 1.0 - 1; t2[0][1] += 1.73333) {
      for (t2[1][1] = - 1.73333 * 0.0 - 1; t2[1][1] <= + 1.73333 * 1.0 - 1; t2[1][1] += 1.73333) {
      for (t2[0][2] = - 1.73333 * 0.0 - 1; t2[0][2] <= + 1.73333 * 1.0 - 1; t2[0][2] += 1.73333) {
      for (t2[1][2] = - 1.73333 * 0.0 - 1; t2[1][2] <= + 1.73333 * 1.0 - 1; t2[1][2] += 1.73333) {

        iauASTROM res0 = {0};
        modulo = modulo > 40
          ? 0 : modulo + 1;
        if (modulo != 1) continue;
        printf("  [");
        printf("%.28e", t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        exportPV3(t2);
        printf(", ");
        iauApcs13(t0, t1, t2, &res0);
        exportASTROM(res0);
        printf("  ],\n");

      }
      }
      }
      }
      }
      }
    }
  }

  printf("];\n");
}
