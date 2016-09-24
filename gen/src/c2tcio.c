/* Generate Test Data for c2tcio */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3][3];
  double _t0[3][3];
  double t1;
  double t2[3][3];
  double _t2[3][3];
  unsigned long long modulo = 0;
  printf("var c2tcio_results = [\n");
  long mod0 = 0;
  for (_t0[0][0] = 0; _t0[0][0] <= 1; _t0[0][0] += 1) {
  for (_t0[0][1] = 0; _t0[0][1] <= 1; _t0[0][1] += 1) {
  for (_t0[0][2] = 0; _t0[0][2] <= 1; _t0[0][2] += 1) {
  for (_t0[1][0] = 0; _t0[1][0] <= 1; _t0[1][0] += 1) {
  for (_t0[1][1] = 0; _t0[1][1] <= 1; _t0[1][1] += 1) {
  for (_t0[1][2] = 0; _t0[1][2] <= 1; _t0[1][2] += 1) {
  for (_t0[2][0] = 0; _t0[2][0] <= 1; _t0[2][0] += 1) {
  for (_t0[2][1] = 0; _t0[2][1] <= 1; _t0[2][1] += 1) {
  for (_t0[2][2] = 0; _t0[2][2] <= 1; _t0[2][2] += 1) {
    mod0 ++;
    if (mod0 > 191102976) mod0 = 0;
    if (mod0 != 1) continue;
    for (t1 = -12; t1 <= 12; t1 += 3.75) {
      long mod2 = 0;
      for (_t2[0][0] = 0; _t2[0][0] <= 1; _t2[0][0] += 1) {
      for (_t2[0][1] = 0; _t2[0][1] <= 1; _t2[0][1] += 1) {
      for (_t2[0][2] = 0; _t2[0][2] <= 1; _t2[0][2] += 1) {
      for (_t2[1][0] = 0; _t2[1][0] <= 1; _t2[1][0] += 1) {
      for (_t2[1][1] = 0; _t2[1][1] <= 1; _t2[1][1] += 1) {
      for (_t2[1][2] = 0; _t2[1][2] <= 1; _t2[1][2] += 1) {
      for (_t2[2][0] = 0; _t2[2][0] <= 1; _t2[2][0] += 1) {
      for (_t2[2][1] = 0; _t2[2][1] <= 1; _t2[2][1] += 1) {
      for (_t2[2][2] = 0; _t2[2][2] <= 1; _t2[2][2] += 1) {
        mod2 ++;
        if (mod2 > 191102976) mod2 = 0;
        if (mod2 != 1) continue;

        double res0[3][3] = {0};
        modulo = modulo > 2218
          ? 0 : modulo + 1;
        if (modulo != 1) continue;
    memcpy(&t0, &_t0, sizeof t0);
        memcpy(&t2, &_t2, sizeof t2);
        printf("  [");
        exportMAT33(t0);
        printf(", ");
        printf("%.28e", t1);
        printf(", ");
        exportMAT33(t2);
        printf(", ");
        iauC2tcio(t0, t1, t2, res0);
        exportMAT33(res0);
        printf("  ],\n");

      }
      }
      }
      }
      }
      }
      }
      }
      }
    }
  }
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
