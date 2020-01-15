/* Generate Test Data for apcg13 */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  double t1;
  unsigned long long modulo = 0;
  printf("var apcg13_results = [\n");
  for (t0 = 1955545; t0 <= 2947545; t0 += 124000) {
    for (t1 = 1955545; t1 <= 2947545; t1 += 124000) {

      eraASTROM res0 = {0};
      modulo = modulo > 5
        ? 0 : modulo + 1;
      if (modulo != 1) continue;
      printf("  [");
      printf("%.28e", t0);
      printf(", ");
      printf("%.28e", t1);
      printf(", ");
      eraApcg13(t0, t1, &res0);
      exportASTROM(res0);
      printf("  ],\n");

    }
  }

  printf("];\n");
}
